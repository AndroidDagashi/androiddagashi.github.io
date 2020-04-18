export default class GitHubConfig {
  static readonly API_URL = 'https://api.github.com/graphql'

  readonly repoOwner: string
  readonly repoName: string
  readonly apiToken: string

  constructor(repoOwner: string, repoName: string, apiToken: string) {
    this.repoOwner = repoOwner
    this.repoName = repoName
    this.apiToken = apiToken
  }
}
