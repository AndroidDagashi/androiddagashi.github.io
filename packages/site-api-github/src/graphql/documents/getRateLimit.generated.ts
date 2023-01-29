/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
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
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()
const GetRateLimitDocumentString = print(GetRateLimitDocument)
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getRateLimit(
      variables?: GetRateLimitVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: GetRateLimit
      extensions?: unknown
      headers: Dom.Headers
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
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
