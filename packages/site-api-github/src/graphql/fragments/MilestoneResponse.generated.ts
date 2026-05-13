/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
import { PageInfoResponse } from './PageInfoResponse.generated'
import { LabelResponse } from './LabelResponse.generated'
import { IssueCommentResponse } from './IssueCommentResponse.generated'
import { AuthorResponse } from './AuthorResponse.generated'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
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

export const MilestoneResponse = gql`
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
  ${PageInfoResponse}
  ${LabelResponse}
  ${IssueCommentResponse}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
