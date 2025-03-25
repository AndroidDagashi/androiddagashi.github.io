/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type PageInfoResponse = {
  __typename?: 'PageInfo'
  startCursor?: string | null
  endCursor?: string | null
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const PageInfoResponse = gql`
  fragment PageInfoResponse on PageInfo {
    startCursor
    endCursor
    hasPreviousPage
    hasNextPage
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
