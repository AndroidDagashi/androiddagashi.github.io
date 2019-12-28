import fs from 'fs'
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost'
import fetch from 'node-fetch'
import GitHubConfig from './GitHubConfig'

import GitHubMilestone from './GitHubMilestone'

export default class GitHubClient {
  readonly config: GitHubConfig

  readonly client: ApolloClient<InMemoryCache>

  constructor (config: GitHubConfig) {
    this.config = config

    this.client = new ApolloClient({
      fetch: fetch as any,
      uri: GitHubConfig.API_URL,
      headers: {
        Authorization: `Bearer ${this.config.apiToken}`
      }
    })
  }

  async getLatestClosedMilestone (): Promise<GitHubMilestone | null> {
    const operation = fs.readFileSync('../apollo/queries/getLatestClosedMilestone.gql', 'utf8')

    const result = await this.client.query({
      query: gql(operation),
      variables: {
        repoName: this.config.repoName,
        repoOwner: this.config.repoOwner
      }
    })

    if ((result.data?.repository?.milestones?.nodes?.length ?? 0) === 0) {
      return null
    } else {
      const milestone = result.data.repository.milestones.nodes[0]
      return {
        title: milestone.title,
        description: milestone.description,
        number: milestone.number
      }
    }
  }
}
