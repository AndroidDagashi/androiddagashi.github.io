export default class GitHubConfig {
  static readonly API_URL = 'https://api.github.com/graphql'

  readonly repoName: string
  readonly repoOwner: string
  readonly apiToken: string

  constructor(
    repoName: string,
    repoOwner: string,
    apiToken: string
  ) {
    this.repoName = repoName
    this.repoOwner = repoOwner
    this.apiToken = apiToken
  }
}
