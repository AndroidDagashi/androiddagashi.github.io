import type { Sns, SnsPost } from './firestore/Milestone'
import type { MilestoneMeta } from './message'
import { generateBlueskyMessage, generateTweetMessage } from './message'
import { findEarliestPost } from './posting'
import type { BlueskyClient } from './bluesky/BlueskyClient'
import type TwitterClient from './twitter/TwitterClient'

export interface SnsPoster {
  readonly sns: Sns
  readonly name: string
  /**
   * Finds a post made earlier but not recorded, e.g. because saving to
   * Firestore failed after posting.
   */
  findExisting(meta: MilestoneMeta): Promise<SnsPost | null>
  post(meta: MilestoneMeta): Promise<SnsPost>
}

export function createTwitterPoster(client: TwitterClient): SnsPoster {
  return {
    sns: 'x',
    name: 'X',
    // Reading the timeline costs X API credits, so posts are not looked up.
    findExisting: async () => null,
    async post(meta) {
      const response = await client.tweet(generateTweetMessage(meta))
      return {
        url: client.getTweetUrl(response),
        postedAt: new Date().toISOString(),
      }
    },
  }
}

export function createBlueskyPoster(client: BlueskyClient): SnsPoster {
  let login: Promise<void> | null = null
  const loggedIn = (): Promise<void> => (login ??= client.login())

  return {
    sns: 'bluesky',
    name: 'Bluesky',
    async findExisting(meta) {
      await loggedIn()
      return findEarliestPost(await client.getRecentPosts(), meta.url)
    },
    async post(meta) {
      await loggedIn()
      const response = await client.post(generateBlueskyMessage(meta), meta)
      return { url: response.uri, postedAt: new Date().toISOString() }
    },
  }
}
