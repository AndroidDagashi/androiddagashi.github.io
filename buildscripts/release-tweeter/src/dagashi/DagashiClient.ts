import fs from 'fs'
import GitHubMilestone from "../github/GitHubMilestone"
import DagashiIndex from "./DagashiIndex"
import DagashiConfig from './DagashiConfig'

export default class DagashiClient {
  readonly config : DagashiConfig

  constructor(
    config: DagashiConfig
  ) {
    this.config = config
   }

  async getLatestMilestone(): Promise<GitHubMilestone | null> {
    if (fs.existsSync(this.config.indexPath)) {
      const json = fs.readFileSync(this.config.indexPath, 'utf8')
      const index = JSON.parse(json) as DagashiIndex
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
