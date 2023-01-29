import {
  GHDigest,
  GHDigestIssue,
  GHDigestMilestone,
} from 'site-types/GitHubApi'
import { GetMilestoneDigests } from '../graphql/documents/index.generated'

type MilestoneDigestResponse = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<GetMilestoneDigests['repository']>['milestones']>
    >['nodes']
  >[number]
>

type DigestIssueResponse = NonNullable<
  NonNullable<MilestoneDigestResponse['issues']['nodes']>[number]
>

export const toGHDigestIssue = (issue: DigestIssueResponse): GHDigestIssue => {
  return {
    title: issue.title,
  }
}

export const toGHDigestMilestone = (
  milestone: MilestoneDigestResponse
): GHDigestMilestone => {
  return {
    id: milestone.id,
    number: milestone.number,
    url: milestone.url,
    path: '',
    title: milestone.title,
    description: milestone.description ?? '',
    closedAt: milestone.closedAt ?? '',
    issues: {
      totalCount: milestone.issues.totalCount,
      nodes: (milestone.issues.nodes ?? []).flatMap((v) => {
        if (!v) return []
        return [toGHDigestIssue(v)]
      }),
    },
  }
}

export const toGHDigest = (data: GetMilestoneDigests): GHDigest | null => {
  const { repository } = data
  if (!repository) {
    return null
  }

  const { milestones } = repository

  if (!milestones) {
    return {
      name: repository.name,
      url: repository.url,
      milestones: {
        totalCount: 0,
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    }
  }

  return {
    name: repository.name,
    url: repository.url,
    milestones: {
      totalCount: milestones.totalCount,
      nodes: (milestones.nodes ?? []).flatMap((v) => {
        if (!v) return []
        return [toGHDigestMilestone(v)]
      }),
      pageInfo: milestones.pageInfo,
    },
  }
}
