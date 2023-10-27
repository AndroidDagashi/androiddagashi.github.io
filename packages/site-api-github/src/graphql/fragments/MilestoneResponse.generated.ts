/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
import { PageInfoResponse } from './PageInfoResponse.generated'
import { LabelResponse } from './LabelResponse.generated'
import { IssueCommentResponse } from './IssueCommentResponse.generated'
import { AuthorResponse } from './AuthorResponse.generated'
export type MilestoneResponse = {
  __typename?: 'Milestone'
  id: string
  number: number
  url: string
  title: string
  description?: string | null
  closedAt?: string | null
  issues: {
    __typename?: 'IssueConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      startCursor?: string | null
      endCursor?: string | null
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
    nodes?: Array<{
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
            | {
                __typename?: 'Bot'
                login: string
                url: string
                avatarUrl: string
              }
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
            | {
                __typename?: 'User'
                login: string
                url: string
                avatarUrl: string
              }
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
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
