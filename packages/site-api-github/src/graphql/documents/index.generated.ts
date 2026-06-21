/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type GetMilestoneDigestsVariables = Exact<{
  repoOwner: string
  repoName: string
  after?: string | null | undefined
}>

export type GetMilestoneDigests = {
  repository: {
    name: string
    url: string
    milestones: {
      totalCount: number
      nodes: Array<{
        id: string
        number: number
        url: string
        title: string
        description: string | null
        closedAt: string | null
        issues: {
          totalCount: number
          nodes: Array<{ title: string } | null> | null
        }
      } | null> | null
      pageInfo: {
        startCursor: string | null
        endCursor: string | null
        hasPreviousPage: boolean
        hasNextPage: boolean
      }
    } | null
  } | null
}

export type GetMilestoneByNumberVariables = Exact<{
  repoOwner: string
  repoName: string
  milestoneNumber: number
}>

export type GetMilestoneByNumber = {
  repository: {
    milestone: {
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
    } | null
  } | null
}

export const GetMilestoneDigests = new TypedDocumentString(`
    query getMilestoneDigests($repoOwner: String!, $repoName: String!, $after: String = null) {
  repository(owner: $repoOwner, name: $repoName) {
    name
    url
    milestones(
      first: 50
      states: [CLOSED]
      orderBy: {field: DUE_DATE, direction: DESC}
      after: $after
    ) {
      totalCount
      nodes {
        ...MilestoneDigestResponse
      }
      pageInfo {
        ...PageInfoResponse
      }
    }
  }
}
    fragment MilestoneDigestResponse on Milestone {
  id
  number
  url
  title
  description
  closedAt
  issues(first: 20) {
    totalCount
    nodes {
      title
    }
  }
}
fragment PageInfoResponse on PageInfo {
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}`)
export const GetMilestoneByNumber = new TypedDocumentString(`
    query getMilestoneByNumber($repoOwner: String!, $repoName: String!, $milestoneNumber: Int!) {
  repository(owner: $repoOwner, name: $repoName) {
    milestone(number: $milestoneNumber) {
      ...MilestoneResponse
    }
  }
}
    fragment PageInfoResponse on PageInfo {
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}
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
}`)
