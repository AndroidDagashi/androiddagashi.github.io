/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
import { AuthorResponse } from './AuthorResponse.generated'
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
