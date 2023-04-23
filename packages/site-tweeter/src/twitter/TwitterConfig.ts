export default class TwitterConfig {
  static readonly URL_REQUEST_TOKEN =
    'https://api.twitter.com/oauth/request_token'
  static readonly URL_AUTHORIZE = 'https://api.twitter.com/oauth/authorize'
  static readonly URL_ACCESS_TOKEN =
    'https://api.twitter.com/oauth/access_token'
  static readonly URL_UPDATE = 'https://api.twitter.com/2/tweets'

  readonly apiKey: string
  readonly apiKeySecret: string

  readonly accessToken: string
  readonly accessTokenSecret: string

  readonly screenName: string

  constructor(
    apiKey: string,
    apiKeySecret: string,
    accessToken: string,
    accessTokenSecret: string,
    screenName: string
  ) {
    this.apiKey = apiKey
    this.apiKeySecret = apiKeySecret
    this.accessToken = accessToken
    this.accessTokenSecret = accessTokenSecret
    this.screenName = screenName
  }
}
