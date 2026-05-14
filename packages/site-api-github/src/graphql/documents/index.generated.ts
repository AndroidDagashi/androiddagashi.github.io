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

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
import { MilestoneDigestResponse } from '../fragments/MilestoneDigestResponse.generated'
import { PageInfoResponse } from '../fragments/PageInfoResponse.generated'
import { MilestoneResponse } from '../fragments/MilestoneResponse.generated'
import { LabelResponse } from '../fragments/LabelResponse.generated'
import { IssueCommentResponse } from '../fragments/IssueCommentResponse.generated'
import { AuthorResponse } from '../fragments/AuthorResponse.generated'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
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

export const GetMilestoneDigestsDocument = gql`
  query getMilestoneDigests(
    $repoOwner: String!
    $repoName: String!
    $after: String = null
  ) {
    repository(owner: $repoOwner, name: $repoName) {
      name
      url
      milestones(
        first: 50
        states: [CLOSED]
        orderBy: { field: DUE_DATE, direction: DESC }
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
  ${MilestoneDigestResponse}
  ${PageInfoResponse}
`
export const GetMilestoneByNumberDocument = gql`
  query getMilestoneByNumber(
    $repoOwner: String!
    $repoName: String!
    $milestoneNumber: Int!
  ) {
    repository(owner: $repoOwner, name: $repoName) {
      milestone(number: $milestoneNumber) {
        ...MilestoneResponse
      }
    }
  }
  ${MilestoneResponse}
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
const GetMilestoneDigestsDocumentString = print(GetMilestoneDigestsDocument)
const GetMilestoneByNumberDocumentString = print(GetMilestoneByNumberDocument)
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getMilestoneDigests(
      variables: GetMilestoneDigestsVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: GetMilestoneDigests
      errors?: GraphQLError[]
      extensions?: unknown
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetMilestoneDigests>(
            GetMilestoneDigestsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getMilestoneDigests',
        'query',
        variables
      )
    },
    getMilestoneByNumber(
      variables: GetMilestoneByNumberVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: GetMilestoneByNumber
      errors?: GraphQLError[]
      extensions?: unknown
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetMilestoneByNumber>(
            GetMilestoneByNumberDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getMilestoneByNumber',
        'query',
        variables
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
