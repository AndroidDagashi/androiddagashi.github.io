/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type IssueCommentResponse = {
  body: string
  publishedAt: string | null
  isMinimized: boolean
  minimizedReason: string | null
  author:
    | { login: string; url: string; avatarUrl: string }
    | { login: string; url: string; avatarUrl: string }
    | { login: string; url: string; avatarUrl: string }
    | { login: string; url: string; avatarUrl: string }
    | { login: string; url: string; avatarUrl: string }
    | null
}

export const IssueCommentResponse = new TypedDocumentString(
  `
    fragment IssueCommentResponse on IssueComment {
  body
  publishedAt
  isMinimized
  minimizedReason
  author {
    ...AuthorResponse
  }
}
    fragment AuthorResponse on Actor {
  login
  url
  avatarUrl
}`,
  { fragmentName: 'IssueCommentResponse' }
)
