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
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type GetRateLimitVariables = Exact<{ [key: string]: never }>

export type GetRateLimit = {
  rateLimit: {
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
