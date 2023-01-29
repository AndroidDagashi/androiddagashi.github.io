/* eslint-disable */
import * as Types from '../globals'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
export type AuthorResponse_Bot_ = {
  __typename?: 'Bot'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_EnterpriseUserAccount_ = {
  __typename?: 'EnterpriseUserAccount'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_Mannequin_ = {
  __typename?: 'Mannequin'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_Organization_ = {
  __typename?: 'Organization'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_User_ = {
  __typename?: 'User'
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse =
  | AuthorResponse_Bot_
  | AuthorResponse_EnterpriseUserAccount_
  | AuthorResponse_Mannequin_
  | AuthorResponse_Organization_
  | AuthorResponse_User_

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
