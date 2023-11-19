import fs from 'fs'
import type DagashiConfig from './DagashiConfig'
import { readFile } from 'site-common/file'
import type { GitHubApi } from 'site-types'

export default class DagashiClient {
  readonly config: DagashiConfig

  constructor(config: DagashiConfig) {
    this.config = config
  }

  async getLatestMilestone(): Promise<GitHubApi.GHDigestMilestone | null> {
    if (fs.existsSync(this.config.apiDirectory)) {
      const json = await readFile(`${this.config.apiDirectory}/index.json`)
      const index = JSON.parse(json) as GitHubApi.GHDigest
      if (index.milestones.nodes.length > 0) {
        return index.milestones.nodes[0]
      } else {
        return null
      }
    } else {
      return null
    }
  }
}
