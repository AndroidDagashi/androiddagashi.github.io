import { GitHubClient } from 'site-api-github'
import { GHDigest } from 'site-types/GitHubApi'
import { writeFile } from 'site-common/file'
import { OutputDirs } from '../config'
import { normalizeIssuePath } from '../utils'

export default class TopDigestsGenerator {
  private readonly githubClient: GitHubClient
  private readonly outputDirs: OutputDirs

  private fileName = 'index'

  constructor(githubClient: GitHubClient, outputDirs: OutputDirs) {
    this.githubClient = githubClient
    this.outputDirs = outputDirs
  }

  /**
   * @returns milestone numbers
   */
  async generate(): Promise<number[]> {
    let nextCursor: string | null = null
    let hasNext = true
    let fileName = 'index'

    let milestoneNumbers: number[] = []

    while (hasNext) {
      const repo: GHDigest = await this.githubClient.getMilestoneDigests(
        nextCursor
      )

      repo.milestones.nodes.forEach((milestone) => {
        milestone.path = normalizeIssuePath(milestone)
      })

      await writeFile(
        `${this.outputDirs.root}/${fileName}.json`,
        JSON.stringify(repo, null, '  ')
      )

      milestoneNumbers = milestoneNumbers.concat(
        repo.milestones.nodes.map((milestone) => milestone.number)
      )

      const pageInfo = repo.milestones.pageInfo
      hasNext = pageInfo.hasNextPage
      nextCursor = pageInfo.endCursor
      if (hasNext && nextCursor) {
        fileName = nextCursor
      }
    }

    return milestoneNumbers
  }
}
