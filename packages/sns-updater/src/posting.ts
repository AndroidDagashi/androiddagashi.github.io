import { AppBskyEmbedExternal, AppBskyFeedPost } from '@atproto/api'
import type Milestone from './firestore/Milestone'

export interface PostTargets {
  twitter: boolean
  bluesky: boolean
}

/**
 * Decides which SNS still needs a post for the milestone, based on what has
 * been recorded in Firestore. Each SNS is judged by its own field so that a
 * failure on one SNS does not make the other one post again on the next run.
 */
export function resolvePostTargets(saved: Milestone | null): PostTargets {
  return {
    twitter: !saved?.tweetUrl,
    bluesky: !saved?.blueskyUri,
  }
}

export interface FeedPost {
  uri: string
  record: unknown
}

/**
 * Finds the earliest post in the author's feed that links to `url` through an
 * external embed, and returns its AT URI. When duplicates exist, the earliest
 * one is the original and the one to keep. This reads the record we wrote
 * rather than the AppView's rendered embed, whose shape varies (e.g. article
 * views).
 */
export function findPostedUri(
  posts: readonly FeedPost[],
  url: string
): string | null {
  let earliest: { uri: string; createdAt: string } | null = null
  for (const post of posts) {
    const record = asPostRecord(post.record)
    if (
      record == null ||
      !AppBskyEmbedExternal.isMain(record.embed) ||
      record.embed.external.uri !== url
    ) {
      continue
    }
    if (earliest == null || record.createdAt < earliest.createdAt) {
      earliest = { uri: post.uri, createdAt: record.createdAt }
    }
  }
  return earliest?.uri ?? null
}

function asPostRecord(record: unknown): AppBskyFeedPost.Record | null {
  // isRecord only checks $type, so the fields are typed by the cast.
  return AppBskyFeedPost.isRecord(record)
    ? (record as AppBskyFeedPost.Record)
    : null
}
