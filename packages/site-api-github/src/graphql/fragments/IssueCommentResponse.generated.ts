/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
import { AuthorResponse } from './AuthorResponse.generated'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type IssueCommentResponse = {
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
}

export const IssueCommentResponse = gql`
  fragment IssueCommentResponse on IssueComment {
    body
    publishedAt
    isMinimized
    minimizedReason
    author {
      ...AuthorResponse
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
