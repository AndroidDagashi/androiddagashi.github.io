import fetch from 'cross-fetch'
import GitHubConfig from './GitHubConfig'
import { GHMilestone, GHDigest } from 'site-types/GitHubApi'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from './graphql/documents/index.generated'
import { GraphQLError } from 'graphql'
import { toGHDigest } from './mappers/toGHDigest'
import { toGHMilestone } from './mappers/toGHMilestone'

export default class GitHubClient {
  readonly config: GitHubConfig
  readonly client: GraphQLClient

  private constructor(config: GitHubConfig) {
    this.config = config

    this.client = new GraphQLClient(GitHubConfig.API_URL, {
      headers: {
        Authorization: `Bearer ${this.config.apiToken}`,
      },
    })
  }

  public static async init(config: GitHubConfig): Promise<GitHubClient> {
    const client = new GitHubClient(config)
    return client
  }

  async getMilestoneByNumber(
    milestoneNumber: number
  ): Promise<GHMilestone | null> {
    try {
      const result = await getSdk(this.client).getMilestoneByNumber({
        repoOwner: this.config.repoOwner,
        repoName: this.config.repoName,
        milestoneNumber,
      })

      const milestone = toGHMilestone(result.data)
      if (milestone) {
        return milestone
      } else {
        throw new Error(`failed to load milestone:${milestoneNumber}`)
      }
    } catch (e) {
      if (e instanceof GraphQLError) {
        console.error(e)
        throw new Error(`failed to load milestone:${milestoneNumber}`)
      } else {
        throw e
      }
    }
  }

  async getMilestoneDigests(cursor: string | null): Promise<GHDigest> {
    try {
      const result = await getSdk(this.client).getMilestoneDigests({
        repoOwner: this.config.repoOwner,
        repoName: this.config.repoName,
        after: cursor,
      })

      const digest = toGHDigest(result.data)
      if (digest) {
        return digest
      } else {
        throw new Error(`failed to load digests:${cursor}`)
      }
    } catch (e) {
      console.error(e)
      throw new Error(`failed to load digests:${cursor}`)
    }
  }
}
