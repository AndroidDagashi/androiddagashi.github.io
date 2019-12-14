import TwitterClient from './twitter/TwitterClient'
import FirestoreClient from './firestore/FirestoreClient'
import config from './config'
import GitHubClient from './github/GitHubClient'
import GitHubMilestone from './github/GitHubMilestone'

let twitterClient = new TwitterClient(config.twitterConfig)
let firestoreClient = new FirestoreClient(config.firebaseServiceAccount)
let gitHubClient = new GitHubClient(config.gitHubConfig)

function generateTweetMessage(milestone: GitHubMilestone): string {
  return `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${milestone.number}回を公開しました！ #Androidjp \n` +
    `${milestone.description}\n` +
    `https://androiddagashi.github.io/issue/${milestone.title.trim().replace(/\s/g, '-')}`
}

async function main() {
  try {
    let latestClosedMilestone = await gitHubClient.getLatestClosedMilestone()
    if (latestClosedMilestone == null) {
      console.log("Could not fetch latest closed milestone from GitHub. Terminating...")
      return
    }

    let savedMilestone = await firestoreClient.getMilestone(latestClosedMilestone.number)
    if (savedMilestone != null) {
      console.log(`Milestone:${savedMilestone.number} is already tweeted. Terminating...`)
      return
    }

    let message = generateTweetMessage(latestClosedMilestone)
    let response = await twitterClient.tweet(encodeURIComponent(message))

    await firestoreClient.addMilestone({
      title: latestClosedMilestone.title,
      number: latestClosedMilestone.number,
      tweetUrl: twitterClient.getTweetUrl(response),
      timestamp: Date.now()
    })

    console.log('tweeted and saved')
  } catch (err) {
    console.log('error', err)
  }
}

main().then(() => {
  console.log('finished')
})
