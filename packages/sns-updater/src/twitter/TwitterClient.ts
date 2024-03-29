import { OAuth } from 'oauth'
import TwitterConfig from './TwitterConfig'
import type TweetResponse from './TweetResponse'

export default class TwitterClient {
  private readonly config: TwitterConfig
  private readonly oauth: OAuth

  constructor(config: TwitterConfig) {
    this.config = config
    this.oauth = new OAuth(
      TwitterConfig.URL_REQUEST_TOKEN,
      TwitterConfig.URL_ACCESS_TOKEN,
      config.apiKey,
      config.apiKeySecret,
      '1.0A',
      null,
      'HMAC-SHA1'
    )
  }

  tweet(message: string): Promise<TweetResponse> {
    return new Promise<TweetResponse>((resolve, reject) => {
      this.oauth.post(
        TwitterConfig.URL_UPDATE,
        this.config.accessToken,
        this.config.accessTokenSecret,
        JSON.stringify({ text: message }),
        'application/json',
        (err, result) => {
          if (err) {
            reject(err)
            return
          }
          resolve(JSON.parse(result as string))
        }
      )
    })
  }

  private escapeMessage(message: string): string {
    return encodeURIComponent(message)
      .replace(/!/g, '%21')
      .replace(/\*/g, '%2A')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
  }

  getTweetUrl(tweet: TweetResponse): string {
    return `https://twitter.com/${this.config.screenName}/${tweet.data.id}`
  }
}
