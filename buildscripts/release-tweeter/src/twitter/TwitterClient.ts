import { OAuth } from 'oauth'
import TwitterConfig from './TwitterConfig'
import TweetResponse from './TweetResponse';

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
    );
  }

  tweet(message: string): Promise<TweetResponse> {
    return new Promise<TweetResponse>((resolve, reject) => {
      this.oauth.post(
        `${TwitterConfig.URL_UPDATE}?status=${message}`,
        this.config.accessToken,
        this.config.accessTokenSecret,
        null,
        'text/plain',
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
}
