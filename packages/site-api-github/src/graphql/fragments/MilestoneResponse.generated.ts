/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type MilestoneResponse = {
  id: string
  number: number
  url: string
  title: string
  description: string | null
  closedAt: string | null
  issues: {
    totalCount: number
    pageInfo: {
      startCursor: string | null
      endCursor: string | null
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
    nodes: Array<{
      url: string
      title: string
      body: string
      labels: {
        nodes: Array<{
          name: string
          description: string | null
          color: string
        } | null> | null
      } | null
      comments: {
        totalCount: number
        pageInfo: {
          startCursor: string | null
          endCursor: string | null
          hasPreviousPage: boolean
          hasNextPage: boolean
        }
        nodes: Array<{
          body: string
          publishedAt: string | null
          isMinimized: boolean
          minimizedReason: string | null
          author:
            | { login: string; url: string; avatarUrl: string }
            | { login: string; url: string; avatarUrl: string }
            | { login: string; url: string; avatarUrl: string }
            | { login: string; url: string; avatarUrl: string }
            | { login: string; url: string; avatarUrl: string }
            | null
        } | null> | null
      }
    } | null> | null
  }
}

export const MilestoneResponse = new TypedDocumentString(
  `
    fragment MilestoneResponse on Milestone {
  id
  number
  url
  title
  description
  closedAt
  issues(first: 50) {
    totalCount
    pageInfo {
      ...PageInfoResponse
    }
    nodes {
      url
      title
      body
      labels(first: 10) {
        nodes {
          ...LabelResponse
        }
      }
      comments(first: 10) {
        totalCount
        pageInfo {
          ...PageInfoResponse
        }
        nodes {
          ...IssueCommentResponse
        }
      }
    }
  }
}
    fragment PageInfoResponse on PageInfo {
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}
fragment LabelResponse on Label {
  name
  description
  color
}
fragment IssueCommentResponse on IssueComment {
  body
  publishedAt
  isMinimized
  minimizedReason
  author {
    ...AuthorResponse
  }
}
fragment AuthorResponse on Actor {
  login
  url
  avatarUrl
}`,
  { fragmentName: 'MilestoneResponse' }
)
