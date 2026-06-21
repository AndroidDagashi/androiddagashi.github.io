/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type AuthorResponse_Bot = {
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_EnterpriseUserAccount = {
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_Mannequin = {
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_Organization = {
  login: string
  url: string
  avatarUrl: string
}

export type AuthorResponse_User = {
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

export const AuthorResponse = new TypedDocumentString(
  `
    fragment AuthorResponse on Actor {
  login
  url
  avatarUrl
}
    `,
  { fragmentName: 'AuthorResponse' }
)
