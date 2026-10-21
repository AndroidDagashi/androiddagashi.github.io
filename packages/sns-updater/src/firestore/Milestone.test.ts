import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toMilestone } from './Milestone'

test('reads a legacy document as a post on X only', () => {
  const milestone = toMilestone({
    title: '443-2026-09-06',
    number: 443,
    tweetUrl: 'https://twitter.com/AndroidDagashi/1',
    createdAt: 'Mon Sep 07 18:54:55 +0900 2026',
  })
  assert.deepEqual(milestone, {
    title: '443-2026-09-06',
    number: 443,
    posts: {
      x: {
        url: 'https://twitter.com/AndroidDagashi/1',
        postedAt: 'Mon Sep 07 18:54:55 +0900 2026',
      },
    },
  })
})

test('reads posts for each SNS', () => {
  const posts = {
    bluesky: {
      url: 'at://did:plc:xxx/app.bsky.feed.post/aaa',
      postedAt: '2026-10-18T11:32:28.283Z',
    },
  }
  const milestone = toMilestone({ title: '449-2026-10-18', number: 449, posts })
  assert.deepEqual(milestone.posts, posts)
})
