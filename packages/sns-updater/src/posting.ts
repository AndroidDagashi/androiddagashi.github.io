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
 * Finds a post in the author's feed that links to `url` through an external
 * embed, and returns its AT URI. This reads the record we wrote rather than the
 * AppView's rendered embed, whose shape varies (e.g. article views).
 */
export function findPostedUri(
  posts: readonly FeedPost[],
  url: string
): string | null {
  return (
    posts.find((post) => externalEmbedUri(post.record) === url)?.uri ?? null
  )
}

function externalEmbedUri(record: unknown): string | null {
  if (!AppBskyFeedPost.isRecord(record)) {
    return null
  }
  // isRecord only checks $type, so the fields are typed by the cast.
  const { embed } = record as AppBskyFeedPost.Record
  return AppBskyEmbedExternal.isMain(embed) ? embed.external.uri : null
}
