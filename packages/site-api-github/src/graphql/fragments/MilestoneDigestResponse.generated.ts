/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type MilestoneDigestResponse = {
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
}

export const MilestoneDigestResponse = gql`
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
