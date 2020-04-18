import TwitterClient from './src/twitter/TwitterClient'
import FirestoreClient from './src/firestore/FirestoreClient'
import TwitterConfig from './src/twitter/TwitterConfig'
import { GHDigestMilestone } from 'site-types/GitHubApi'
import DagashiClient from './src/dagashi/DagashiClient'
import { readFile } from 'site-common/file'
import path from 'path'
import DagashiConfig from './src/dagashi/DagashiConfig'

function createDagashiClient(): DagashiClient {
  const apiDirectory = path.resolve(__dirname, '../site/static/api')
  const config = new DagashiConfig(apiDirectory)
  return new DagashiClient(config)
}

function createTwitterClient(): TwitterClient {
  const config = new TwitterConfig(
    process.env.TWITTER_API_KEY as string,
    process.env.TWITTER_API_KEY_SECRET as string,
    process.env.TWITTER_ACCESS_TOKEN as string,
    process.env.TWITTER_ACCESS_TOKEN_SECRET as string
  )

  return new TwitterClient(config)
}

async function createFirestoreClient(): Promise<FirestoreClient> {
  const jsonPath = path.resolve(
    __dirname,
    '../../androiddagashi-serviceaccount.json'
  )
  const serviceAccount = JSON.parse(await readFile(jsonPath))

  return new FirestoreClient(serviceAccount)
}

function generateTweetMessage(milestone: GHDigestMilestone): string {
  return (
    `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${milestone.number}回を公開しました！ #Androidjp \n\n` +
    `${milestone.description}\n\n` +
    `https://androiddagashi.github.io/issue/${milestone.title
      .trim()
      .replace(/\s/g, '-')}`
  )
}

async function main(): Promise<void> {
  try {
    const dagashiClient = createDagashiClient()
    const latestClosedMilestone = await dagashiClient.getLatestMilestone()

    if (latestClosedMilestone == null) {
      console.log(
        'Could not fetch latest closed milestone from GitHub. Terminating...'
      )
      return
    }

    const firestoreClient = await createFirestoreClient()
    const savedMilestone = await firestoreClient.getMilestone(
      latestClosedMilestone.number
    )
    if (savedMilestone != null) {
      console.log(
        `Milestone:${savedMilestone.number} has already been tweeted. Terminating...`
      )
      return
    }

    const twitterClient = createTwitterClient()
    const message = generateTweetMessage(latestClosedMilestone)
    const response = await twitterClient.tweet(message)

    await firestoreClient.addMilestone({
      title: latestClosedMilestone.title,
      number: latestClosedMilestone.number,
      tweetUrl: twitterClient.getTweetUrl(response),
      createdAt: response.created_at,
    })

    console.log('tweeted and saved')
  } catch (err) {
    console.log('error', err)
  }
}

main().then(() => {
  console.log('finished')
})
