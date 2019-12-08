import TwitterClient from './twitter/TwitterClient'
import TwitterConfig from './twitter/TwitterConfig'

let client = new TwitterClient(
  new TwitterConfig(
    process.env.TWITTER_API_KEY as string,
    process.env.TWITTER_API_KEY_SECRET as string,
    process.env.TWITTER_ACCESS_TOKEN as string,
    process.env.TWITTER_ACCESS_TOKEN_SECRET as string
  )
)

async function main() {
  try {
    let result = await client.tweet('test3')
    console.log("tweeted", result)
  } catch (err) {
    console.log('error', err)
  }
}

main().then(() => {
  console.log("finished")
})
