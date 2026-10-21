import { AppBskyEmbedExternal, AppBskyFeedPost } from '@atproto/api'
import type { SnsPost } from './firestore/Milestone'

export interface FeedPost {
  uri: string
  record: unknown
}

/**
 * Finds the earliest post in the author's feed that links to `url` through an
 * external embed. When duplicates exist, the earliest one is the original and
 * the one to keep. This reads the record we wrote rather than the AppView's
 * rendered embed, whose shape varies (e.g. article views).
 */
export function findEarliestPost(
  posts: readonly FeedPost[],
  url: string
): SnsPost | null {
  let earliest: { post: SnsPost; time: number } | null = null
  for (const post of posts) {
    const record = asPostRecord(post.record)
    if (
      record == null ||
      !AppBskyEmbedExternal.isMain(record.embed) ||
      record.embed.external.uri !== url
    ) {
      continue
    }
    // createdAt is set by the client and may carry any offset, so compare it
    // as a time rather than as a string.
    const time = Date.parse(record.createdAt)
    if (earliest == null || time < earliest.time) {
      earliest = { post: { url: post.uri, postedAt: record.createdAt }, time }
    }
  }
  return earliest?.post ?? null
}

function asPostRecord(record: unknown): AppBskyFeedPost.Record | null {
  // isRecord only checks $type, so the fields are typed by the cast.
  return AppBskyFeedPost.isRecord(record)
    ? (record as AppBskyFeedPost.Record)
    : null
}
