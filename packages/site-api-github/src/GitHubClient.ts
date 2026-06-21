import GitHubConfig from './GitHubConfig'
import type { GHMilestone, GHDigest } from 'site-types/GitHubApi'
import { graphql, GraphqlResponseError } from '@octokit/graphql'
import {
  GetMilestoneByNumber,
  type GetMilestoneByNumberVariables,
  GetMilestoneDigests,
  type GetMilestoneDigestsVariables,
} from './graphql/documents/index.generated'
import { toGHDigest } from './mappers/toGHDigest'
import { toGHMilestone } from './mappers/toGHMilestone'

export default class GitHubClient {
  readonly config: GitHubConfig
  readonly client: typeof graphql

  private constructor(config: GitHubConfig) {
    this.config = config

    this.client = graphql.defaults({
      headers: {
        authorization: `bearer ${this.config.apiToken}`,
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
      const data = await this.client<GetMilestoneByNumber>(
        GetMilestoneByNumber.toString(),
        {
          repoOwner: this.config.repoOwner,
          repoName: this.config.repoName,
          milestoneNumber,
        } satisfies GetMilestoneByNumberVariables
      )

      const milestone = toGHMilestone(data)
      if (milestone) {
        return milestone
      } else {
        throw new Error(`failed to load milestone:${milestoneNumber}`)
      }
    } catch (e) {
      if (e instanceof GraphqlResponseError) {
        console.error(e)
        throw new Error(`failed to load milestone:${milestoneNumber}`)
      } else {
        throw e
      }
    }
  }

  async getMilestoneDigests(cursor: string | null): Promise<GHDigest> {
    try {
      const data = await this.client<GetMilestoneDigests>(
        GetMilestoneDigests.toString(),
        {
          repoOwner: this.config.repoOwner,
          repoName: this.config.repoName,
          after: cursor,
        } satisfies GetMilestoneDigestsVariables
      )

      const digest = toGHDigest(data)
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
