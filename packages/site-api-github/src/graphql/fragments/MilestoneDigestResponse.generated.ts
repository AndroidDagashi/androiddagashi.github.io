/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
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
