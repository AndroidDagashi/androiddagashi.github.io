export type Sns = 'x' | 'bluesky'

export interface SnsPost {
  url: string
  // ISO 8601, except for tweets recorded before Bluesky support.
  postedAt: string
}

export default interface Milestone {
  title: string
  number: number
  posts: Partial<Record<Sns, SnsPost>>
}

/**
 * Reads a milestone document. Documents written before Bluesky support have
 * `tweetUrl` and `createdAt` at the top level instead of `posts.x`.
 */
export function toMilestone(data: Record<string, unknown>): Milestone {
  const posts = { ...(data.posts as Milestone['posts'] | undefined) }
  if (posts.x == null && typeof data.tweetUrl === 'string') {
    posts.x = { url: data.tweetUrl, postedAt: String(data.createdAt ?? '') }
  }
  return {
    title: data.title as string,
    number: data.number as number,
    posts,
  }
}
