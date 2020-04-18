import { GitHubClient } from 'site-api-github'
import { OutputDirs } from '../config'
import { writeFile } from 'site-common/file'
import { normalizeIssuePath } from '../utils'

export default class IssueGenerator {
  private readonly githubClient: GitHubClient
  private readonly outputDirs: OutputDirs

  constructor(githubClient: GitHubClient, outputDirs: OutputDirs) {
    this.githubClient = githubClient
    this.outputDirs = outputDirs
  }

  async generate(milestoneNumber: number): Promise<void> {
    const milestone = await this.githubClient.getMilestoneByNumber(
      milestoneNumber
    )

    await writeFile(
      `${this.outputDirs.issues}/${normalizeIssuePath(milestone)}.json`,
      JSON.stringify(milestone, null, '  ')
    )
  }
}
