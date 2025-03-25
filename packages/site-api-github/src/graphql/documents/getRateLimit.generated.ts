/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetRateLimitVariables = Types.Exact<{ [key: string]: never }>

export type GetRateLimit = {
  rateLimit?: {
    __typename?: 'RateLimit'
    limit: number
    cost: number
    remaining: number
    resetAt: string
  } | null
}

export const GetRateLimitDocument = gql`
  query getRateLimit {
    rateLimit {
      limit
      cost
      remaining
      resetAt
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
const GetRateLimitDocumentString = print(GetRateLimitDocument)
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getRateLimit(
      variables?: GetRateLimitVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: GetRateLimit
      errors?: GraphQLError[]
      extensions?: unknown
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetRateLimit>(
            GetRateLimitDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getRateLimit',
        'query',
        variables
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
