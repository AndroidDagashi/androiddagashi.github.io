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
import { AuthorResponse } from './AuthorResponse.generated'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type IssueCommentResponse = {
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
  ${AuthorResponse}
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
