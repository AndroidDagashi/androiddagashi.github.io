/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
import { LabelResponse } from './LabelResponse.generated'
import { PageInfoResponse } from './PageInfoResponse.generated'
import { IssueCommentResponse } from './IssueCommentResponse.generated'
import { AuthorResponse } from './AuthorResponse.generated'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type IssueResponse = {
  __typename?: 'Issue'
  url: string
  title: string
  body: string
  labels?: {
    __typename?: 'LabelConnection'
    nodes?: Array<{
      __typename?: 'Label'
      name: string
      description?: string | null
      color: string
    } | null> | null
  } | null
  comments: {
    __typename?: 'IssueCommentConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
    nodes?: Array<{
      __typename?: 'IssueComment'
      body: string
      publishedAt?: string | null
      isMinimized: boolean
      minimizedReason?: string | null
      author?:
        | { __typename?: 'Bot'; login: string; url: string; avatarUrl: string }
        | {
            __typename?: 'EnterpriseUserAccount'
            login: string
            url: string
            avatarUrl: string
          }
        | {
            __typename?: 'Mannequin'
            login: string
            url: string
            avatarUrl: string
          }
        | {
            __typename?: 'Organization'
            login: string
            url: string
            avatarUrl: string
          }
        | { __typename?: 'User'; login: string; url: string; avatarUrl: string }
        | null
    } | null> | null
  }
}

export const IssueResponse = gql`
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
