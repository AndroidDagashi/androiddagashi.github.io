import TwitterClient from './src/twitter/TwitterClient'
import FirestoreClient from './src/firestore/FirestoreClient'
import TwitterConfig from './src/twitter/TwitterConfig'
import DagashiClient from './src/dagashi/DagashiClient'
import { readFile } from 'site-common/file'
import path from 'path'
import DagashiConfig from './src/dagashi/DagashiConfig'
import { format } from 'date-fns'
import type { MilestoneMeta } from './src/message'
import {
  createMilestoneMeta,
  generateBlueskyMessage,
  generateTweetMessage,
} from './src/message'
import { findPostedUri, resolvePostTargets } from './src/posting'
import { BlueskyClient } from './src/bluesky/BlueskyClient'
import BlueskyConfig from './src/bluesky/BlueskyConfig'

function createDagashiClient(): DagashiClient {
  const apiDirectory = path.resolve(import.meta.dirname, '../site/public/api')
  const config = new DagashiConfig(apiDirectory)
  return new DagashiClient(config)
}

function createTwitterClient(): TwitterClient {
  const config = new TwitterConfig(
    process.env.TWITTER_API_KEY as string,
    process.env.TWITTER_API_KEY_SECRET as string,
    process.env.TWITTER_ACCESS_TOKEN as string,
    process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
    process.env.TWITTER_SCREEN_NAME as string
  )

  return new TwitterClient(config)
}

function createBlueskyClient(): BlueskyClient {
  const config = new BlueskyConfig(
    process.env.BLUESKY_IDENTIFIER as string,
    process.env.BLUESKY_PASSWORD as string
  )

  return new BlueskyClient(config)
}

async function createFirestoreClient(): Promise<FirestoreClient> {
  const jsonPath = path.resolve(
    import.meta.dirname,
    '../../androiddagashi-serviceaccount.json'
  )
  const serviceAccount = JSON.parse(await readFile(jsonPath))

  return new FirestoreClient(serviceAccount)
}

// With SNS_DRY_RUN=1, Firestore and the Bluesky feed are read but nothing is
// posted or saved.
const dryRun = process.env.SNS_DRY_RUN === '1'

function now(): string {
  return format(new Date(), 'EEE MMM dd kk:mm:ss xxxx yyyy')
}

async function postToTwitter(
  meta: MilestoneMeta,
  firestoreClient: FirestoreClient
): Promise<void> {
  if (dryRun) {
    console.log(`[dry-run] X: would post Milestone:${meta.number}`)
    return
  }

  const twitterClient = createTwitterClient()
  const message = generateTweetMessage(meta)
  const response = await twitterClient.tweet(message)
  const tweetUrl = twitterClient.getTweetUrl(response)
  console.log('X: posted', tweetUrl)

  await firestoreClient.saveMilestone({
    title: meta.title,
    number: meta.number,
    tweetUrl,
    createdAt: now(),
  })
}

async function postToBluesky(
  meta: MilestoneMeta,
  firestoreClient: FirestoreClient
): Promise<void> {
  const client = createBlueskyClient()
  await client.login()

  // Firestore can miss a post that was made when saving failed, so the feed is
  // the final check against posting the same milestone twice.
  const existingUri = findPostedUri(await client.getRecentPosts(), meta.url)
  if (existingUri != null) {
    console.log('Bluesky: already posted', existingUri)
    if (!dryRun) {
      await firestoreClient.saveMilestone({
        title: meta.title,
        number: meta.number,
        blueskyUri: existingUri,
      })
    }
    return
  }

  if (dryRun) {
    console.log(`[dry-run] Bluesky: would post Milestone:${meta.number}`)
    return
  }

  const message = generateBlueskyMessage(meta)
  const response = await client.post(message, meta)
  console.log('Bluesky: posted', response.uri)

  await firestoreClient.saveMilestone({
    title: meta.title,
    number: meta.number,
    blueskyUri: response.uri,
    blueskyPostedAt: now(),
  })
}

/** Returns false if posting to any SNS failed. */
async function main(): Promise<boolean> {
  const dagashiClient = createDagashiClient()
  const latestClosedMilestone = await dagashiClient.getLatestMilestone()

  if (latestClosedMilestone == null) {
    console.log(
      'Could not fetch latest closed milestone from GitHub. Terminating...'
    )
    return true
  }

  const firestoreClient = await createFirestoreClient()
  const savedMilestone = await firestoreClient.getMilestone(
    latestClosedMilestone.number
  )
  const targets = resolvePostTargets(savedMilestone)
  const meta = createMilestoneMeta(latestClosedMilestone)

  const jobs: [string, () => Promise<void>][] = []
  if (targets.twitter) {
    jobs.push(['X', () => postToTwitter(meta, firestoreClient)])
  } else {
    console.log(`X: Milestone:${meta.number} has already been posted`)
  }
  if (targets.bluesky) {
    jobs.push(['Bluesky', () => postToBluesky(meta, firestoreClient)])
  } else {
    console.log(`Bluesky: Milestone:${meta.number} has already been posted`)
  }

  // Each SNS runs and records independently, so one failing does not cause the
  // other to post again on the next run.
  const results = await Promise.allSettled(jobs.map(([, job]) => job()))
  let ok = true
  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.log(`${jobs[i][0]}: error`, result.reason)
      ok = false
    }
  })
  return ok
}

main().then(
  (ok) => {
    if (!ok) {
      process.exitCode = 1
    }
    console.log('finished')
  },
  (err) => {
    console.log('error', err)
    process.exitCode = 1
  }
)
