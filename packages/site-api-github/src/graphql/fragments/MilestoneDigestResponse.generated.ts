/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/* eslint-disable */
import * as Types from '../globals'

import { TypedDocumentString } from '../TypedDocumentString'
export type MilestoneDigestResponse = {
  id: string
  number: number
  url: string
  title: string
  description: string | null
  closedAt: string | null
  issues: { totalCount: number; nodes: Array<{ title: string } | null> | null }
}

export const MilestoneDigestResponse = new TypedDocumentString(
  `
    fragment MilestoneDigestResponse on Milestone {
  id
  number
  url
  title
  description
  closedAt
  issues(first: 20) {
    totalCount
    nodes {
      title
    }
  }
}
    `,
  { fragmentName: 'MilestoneDigestResponse' }
)
