import TwitterClient from './src/twitter/TwitterClient'
import FirestoreClient from './src/firestore/FirestoreClient'
import type Milestone from './src/firestore/Milestone'
import TwitterConfig from './src/twitter/TwitterConfig'
import DagashiClient from './src/dagashi/DagashiClient'
import { readFile } from 'site-common/file'
import path from 'path'
import DagashiConfig from './src/dagashi/DagashiConfig'
import type { MilestoneMeta } from './src/message'
import { createMilestoneMeta } from './src/message'
import type { SnsPoster } from './src/posters'
import { createBlueskyPoster, createTwitterPoster } from './src/posters'
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

/**
 * Posts the milestone to one SNS unless it is already posted there. Returns
 * false if it failed. Each SNS posts and records on its own, so a failure on
 * one does not make the other post again on the next run.
 */
async function publish(
  poster: SnsPoster,
  meta: MilestoneMeta,
  saved: Milestone | null,
  firestoreClient: FirestoreClient
): Promise<boolean> {
  if (saved?.posts[poster.sns] != null) {
    console.log(`${poster.name}: Milestone:${meta.number} is already recorded`)
    return true
  }

  try {
    const existing = await poster.findExisting(meta)
    if (existing != null) {
      console.log(`${poster.name}: already posted`, existing.url)
      await firestoreClient.savePost(meta, poster.sns, existing)
      return true
    }

    const post = await poster.post(meta)
    console.log(`${poster.name}: posted`, post.url)
    await firestoreClient.savePost(meta, poster.sns, post)
    return true
  } catch (err) {
    console.log(`${poster.name}: error`, err)
    return false
  }
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
  const saved = await firestoreClient.getMilestone(latestClosedMilestone.number)
  const meta = createMilestoneMeta(latestClosedMilestone)

  const posters = [
    createTwitterPoster(createTwitterClient()),
    createBlueskyPoster(createBlueskyClient()),
  ]
  const results = await Promise.all(
    posters.map((poster) => publish(poster, meta, saved, firestoreClient))
  )
  return results.every(Boolean)
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
