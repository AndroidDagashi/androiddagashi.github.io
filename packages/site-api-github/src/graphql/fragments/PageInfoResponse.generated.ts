/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type PageInfoResponse = {
  startCursor: string | null
  endCursor: string | null
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const PageInfoResponse = new TypedDocumentString(
  `
    fragment PageInfoResponse on PageInfo {
  startCursor
  endCursor
  hasPreviousPage
  hasNextPage
}
    `,
  { fragmentName: 'PageInfoResponse' }
)
