/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
import { MilestoneDigestResponse } from '../fragments/MilestoneDigestResponse.generated'
import { PageInfoResponse } from '../fragments/PageInfoResponse.generated'
import { MilestoneResponse } from '../fragments/MilestoneResponse.generated'
import { LabelResponse } from '../fragments/LabelResponse.generated'
import { IssueCommentResponse } from '../fragments/IssueCommentResponse.generated'
import { AuthorResponse } from '../fragments/AuthorResponse.generated'
export type GetMilestoneDigestsVariables = Types.Exact<{
  repoOwner: Types.Scalars['String']['input']
  repoName: Types.Scalars['String']['input']
  after?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type GetMilestoneDigests = {
  repository?: {
    __typename?: 'Repository'
    name: string
    url: string
    milestones?: {
      __typename?: 'MilestoneConnection'
      totalCount: number
      nodes?: Array<{
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
          nodes?: Array<{ __typename?: 'Issue'; title: string } | null> | null
        }
      } | null> | null
      pageInfo: {
        __typename?: 'PageInfo'
        startCursor?: string | null
        endCursor?: string | null
        hasPreviousPage: boolean
        hasNextPage: boolean
      }
    } | null
  } | null
}

export type GetMilestoneByNumberVariables = Types.Exact<{
  repoOwner: Types.Scalars['String']['input']
  repoName: Types.Scalars['String']['input']
  milestoneNumber: Types.Scalars['Int']['input']
}>

export type GetMilestoneByNumber = {
  repository?: {
    __typename?: 'Repository'
    milestone?: {
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
  ${PageInfoResponse}
  ${LabelResponse}
  ${IssueCommentResponse}
  ${AuthorResponse}
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
        'query'
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
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
