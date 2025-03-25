/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type AuthorResponse_Bot = {
  __typename?: 'Bot'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_EnterpriseUserAccount = {
  __typename?: 'EnterpriseUserAccount'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_Mannequin = {
  __typename?: 'Mannequin'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_Organization = {
  __typename?: 'Organization'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_User = {
  __typename?: 'User'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse =
  | AuthorResponse_Bot
  | AuthorResponse_EnterpriseUserAccount
  | AuthorResponse_Mannequin
  | AuthorResponse_Organization
  | AuthorResponse_User

export const AuthorResponse = gql`
  fragment AuthorResponse on Actor {
    login
    url
    avatarUrl
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
