/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type IssueResponse = {
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
}

export const IssueResponse = new TypedDocumentString(
  `
    fragment IssueResponse on Issue {
  url
  title
  body
  labels {
    nodes {
      ...LabelResponse
    }
  }
  comments {
    totalCount
    pageInfo {
      ...PageInfoResponse
    }
    nodes {
      ...IssueCommentResponse
    }
  }
}
    fragment LabelResponse on Label {
  name
  description
  color
}
fragment PageInfoResponse on PageInfo {
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
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
  { fragmentName: 'IssueResponse' }
)
