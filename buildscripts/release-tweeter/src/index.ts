import TwitterClient from './twitter/TwitterClient'
import FirestoreClient from './firestore/FirestoreClient'
import config from './config'
import GitHubClient from './github/GitHubClient'
import GitHubMilestone from './github/GitHubMilestone'

const twitterClient = new TwitterClient(config.twitterConfig)
const firestoreClient = new FirestoreClient(config.firebaseServiceAccount)
const gitHubClient = new GitHubClient(config.gitHubConfig)

function generateTweetMessage (milestone: GitHubMilestone): string {
  return `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${milestone.number}回を公開しました！ #Androidjp \n\n` +
    `${milestone.description}\n\n` +
    `https://androiddagashi.github.io/issue/${milestone.title.trim().replace(/\s/g, '-')}`
}

async function main () {
  try {
    const latestClosedMilestone = await gitHubClient.getLatestClosedMilestone()
    if (latestClosedMilestone == null) {
      console.log('Could not fetch latest closed milestone from GitHub. Terminating...')
      return
    }

    const savedMilestone = await firestoreClient.getMilestone(latestClosedMilestone.number)
    if (savedMilestone != null) {
      console.log(`Milestone:${savedMilestone.number} has already been tweeted. Terminating...`)
      return
    }

    const message = generateTweetMessage(latestClosedMilestone)
    const response = await twitterClient.tweet(message)

    await firestoreClient.addMilestone({
      title: latestClosedMilestone.title,
      number: latestClosedMilestone.number,
      tweetUrl: twitterClient.getTweetUrl(response),
      createdAt: response.created_at
    })

    console.log('tweeted and saved')
  } catch (err) {
    console.log('error', err)
  }
}

main().then(() => {
  console.log('finished')
})
