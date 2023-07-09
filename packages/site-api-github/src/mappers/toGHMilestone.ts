import type {
  GHComment,
  GHIssue,
  GHLabel,
  GHMilestone,
} from 'site-types/GitHubApi'
import type { GetMilestoneByNumber } from '../graphql/documents/index.generated'
import type { IssueCommentResponse } from '../graphql/fragments/IssueCommentResponse.generated'
import type { IssueResponse } from '../graphql/fragments/IssueResponse.generated'
import type { LabelResponse } from '../graphql/fragments/LabelResponse.generated'

const toGHComment = (comment: IssueCommentResponse): GHComment => {
  return {
    body: comment.body,
    publishedAt: comment.publishedAt ?? '',
    isMinimized: comment.isMinimized,
    minimizedReason: comment.minimizedReason ?? null,
    author: {
      login: comment.author?.login ?? '-',
      url: comment.author?.url ?? '#',
      avatarUrl: comment.author?.avatarUrl ?? '',
    },
  }
}

const toGHLabel = (label: LabelResponse): GHLabel => {
  return {
    name: label.name,
    description: label.description ?? null,
    color: label.color,
  }
}

export const toGHIssue = (issue: IssueResponse): GHIssue => {
  return {
    url: issue.url,
    title: issue.title,
    body: issue.body,
    labels: {
      nodes: (issue.labels?.nodes ?? []).flatMap((v) => {
        if (!v) return []
        return [toGHLabel(v)]
      }),
    },
    comments: {
      totalCount: issue.comments.totalCount,
      pageInfo: issue.comments.pageInfo,
      nodes: (issue.comments.nodes ?? []).flatMap((v) => {
        if (!v) return []
        return [toGHComment(v)]
      }),
    },
  }
}

export const toGHMilestone = (
  data: GetMilestoneByNumber
): GHMilestone | null => {
  const { repository } = data
  if (!repository) return null

  const { milestone } = repository
  if (!milestone) return null

  return {
    id: milestone.id,
    number: milestone.number,
    url: milestone.url,
    title: milestone.title,
    closedAt: milestone.closedAt ?? null,
    description: milestone.description ?? null,
    issues: {
      totalCount: milestone.issues.totalCount,
      pageInfo: {
        startCursor: milestone.issues.pageInfo.startCursor,
        endCursor: milestone.issues.pageInfo.endCursor,
        hasPreviousPage: milestone.issues.pageInfo.hasPreviousPage,
        hasNextPage: milestone.issues.pageInfo.hasNextPage,
      },
      nodes: (milestone.issues.nodes ?? []).flatMap((v) => {
        if (!v) return []
        return [toGHIssue(v)]
      }),
    },
  }
}
