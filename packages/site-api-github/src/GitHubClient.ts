import ApolloClient, { InMemoryCache, gql, DocumentNode } from 'apollo-boost'
import fetch from 'cross-fetch'
import GitHubConfig from './GitHubConfig'
import {
  GHMilestone,
  GHRateLimit,
  GHMilestoneDigestsWrapper,
  GHDigest,
  GHMilestoneWrapper,
} from 'site-types/GitHubApi'
import { readFile } from 'site-common/file'
import path from 'path'

export default class GitHubClient {
  readonly config: GitHubConfig

  readonly client: ApolloClient<InMemoryCache>

  private getLatestClosedMilestoneDocument!: DocumentNode
  private getMilestoneDigestsDocument!: DocumentNode
  private getMilestoneByNumberDocument!: DocumentNode
  private getRateLimitDocument!: DocumentNode

  private constructor(config: GitHubConfig) {
    this.config = config

    this.client = new ApolloClient({
      fetch: fetch,
      uri: GitHubConfig.API_URL,
      headers: {
        Authorization: `Bearer ${this.config.apiToken}`,
      },
      cache: new InMemoryCache({ addTypename: false }),
    })
  }

  public static async init(config: GitHubConfig): Promise<GitHubClient> {
    const client = new GitHubClient(config)

    await client.loadDocuments()

    return client
  }

  private async loadDocuments(): Promise<void> {
    this.getLatestClosedMilestoneDocument = await this.loadDocument(
      'getLatestClosedMilestone.gql'
    )
    this.getMilestoneDigestsDocument = await this.loadDocument(
      'getMilestoneDigests.gql'
    )
    this.getMilestoneByNumberDocument = await this.loadDocument(
      'getMilestoneByNumber.gql'
    )
    this.getRateLimitDocument = await this.loadDocument('getRateLimit.gql')
  }

  private async loadDocument(fileName: string): Promise<DocumentNode> {
    const documentStr = await readFile(
      path.normalize(`${__dirname}/../apollo/queries/${fileName}`)
    )
    return gql(documentStr)
  }

  async getRateLimit(): Promise<number> {
    const { data, errors } = await this.client.query({
      query: this.getRateLimitDocument,
    })

    if (errors?.length || 0 > 0) {
      throw Error('failed to load rate limit')
    } else {
      return (data.rateLimit as GHRateLimit).limit
    }
  }

  async getLatestClosedMilestone(): Promise<GHMilestone | null> {
    const result = await this.client.query({
      query: this.getLatestClosedMilestoneDocument,
      variables: {
        repoName: this.config.repoName,
        repoOwner: this.config.repoOwner,
      },
    })

    if ((result.data?.repository?.milestones?.nodes?.length ?? 0) === 0) {
      return null
    } else {
      return result.data.repository.milestones.nodes[0] as GHMilestone
    }
  }

  async getMilestoneByNumber(milestoneNumber: number): Promise<GHMilestone> {
    const { data, errors } = await this.client.query<GHMilestoneWrapper>({
      query: this.getMilestoneByNumberDocument,
      variables: {
        repoOwner: this.config.repoOwner,
        repoName: this.config.repoName,
        milestoneNumber,
        fetchIssuesPerMilestone: 50,
        fetchCommentsPerIssue: 10,
      },
    })

    if (errors?.length || 0 > 0) {
      throw Error(`failed to load milestone:${milestoneNumber}`)
    } else {
      return data.repository.milestone
    }
  }

  async getMilestoneDigests(cursor: string | null): Promise<GHDigest> {
    const { data, errors } = await this.client.query<GHMilestoneDigestsWrapper>(
      {
        query: this.getMilestoneDigestsDocument,
        variables: {
          repoOwner: this.config.repoOwner,
          repoName: this.config.repoName,
          after: cursor,
        },
      }
    )

    if (errors?.length || 0 > 0) {
      throw Error(`failed to load digests:${cursor}`)
    } else {
      return data.repository
    }
  }
}
