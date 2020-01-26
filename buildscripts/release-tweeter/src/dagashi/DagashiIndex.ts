import GitHubMilestone from "../github/GitHubMilestone";

export default interface DagashiIndex {
  name: string,
  url: string,
  milestones: {
    totalCount: number
    nodes: [GitHubMilestone]
  }
}
