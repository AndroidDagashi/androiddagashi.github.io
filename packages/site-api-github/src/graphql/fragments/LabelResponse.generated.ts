/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type LabelResponse = {
  name: string
  description: string | null
  color: string
}

export const LabelResponse = new TypedDocumentString(
  `
    fragment LabelResponse on Label {
  name
  description
  color
}
    `,
  { fragmentName: 'LabelResponse' }
)
