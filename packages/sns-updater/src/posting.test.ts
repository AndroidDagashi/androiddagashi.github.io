import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findPostedUri, resolvePostTargets } from './posting'

const URL_449 = 'https://androiddagashi.github.io/issue/449-2026-10-18'

function post(
  uri: string,
  embedUri: string,
  createdAt = '2026-10-18T11:32:28.283Z'
): { uri: string; record: unknown } {
  return {
    uri,
    record: {
      $type: 'app.bsky.feed.post',
      text: 'text',
      createdAt,
      embed: {
        $type: 'app.bsky.embed.external',
        external: { uri: embedUri, title: 'title', description: 'desc' },
      },
    },
  }
}

test('posts to both SNS when nothing is recorded', () => {
  assert.deepEqual(resolvePostTargets(null), { twitter: true, bluesky: true })
})

test('posts only to Bluesky when only the tweet is recorded', () => {
  const saved = {
    title: '449-2026-10-18',
    number: 449,
    tweetUrl: 'https://twitter.com/AndroidDagashi/1',
  }
  assert.deepEqual(resolvePostTargets(saved), { twitter: false, bluesky: true })
})

test('posts only to X when only the Bluesky post is recorded', () => {
  const saved = {
    title: '449-2026-10-18',
    number: 449,
    blueskyUri: 'at://did:plc:xxx/app.bsky.feed.post/aaa',
  }
  assert.deepEqual(resolvePostTargets(saved), { twitter: true, bluesky: false })
})

test('posts nowhere when both are recorded', () => {
  const saved = {
    title: '449-2026-10-18',
    number: 449,
    tweetUrl: 'https://twitter.com/AndroidDagashi/1',
    blueskyUri: 'at://did:plc:xxx/app.bsky.feed.post/aaa',
  }
  assert.deepEqual(resolvePostTargets(saved), {
    twitter: false,
    bluesky: false,
  })
})

test('finds an existing post that links to the milestone', () => {
  const posts = [
    post('at://x/app.bsky.feed.post/new', URL_449),
    post('at://x/app.bsky.feed.post/old', 'https://example.com/448'),
  ]
  assert.equal(findPostedUri(posts, URL_449), 'at://x/app.bsky.feed.post/new')
})

test('returns the earliest post when the milestone was posted more than once', () => {
  // The feed lists the newest post first.
  const posts = [
    post(
      'at://x/app.bsky.feed.post/third',
      URL_449,
      '2026-10-21T12:58:41.390Z'
    ),
    post(
      'at://x/app.bsky.feed.post/first',
      URL_449,
      '2026-10-18T11:32:28.283Z'
    ),
    post(
      'at://x/app.bsky.feed.post/second',
      URL_449,
      '2026-10-21T12:56:05.878Z'
    ),
  ]
  assert.equal(findPostedUri(posts, URL_449), 'at://x/app.bsky.feed.post/first')
})

test('returns null when no post links to the milestone', () => {
  const posts = [post('at://x/app.bsky.feed.post/a', 'https://example.com/448')]
  assert.equal(findPostedUri(posts, URL_449), null)
})

test('ignores posts without an external embed', () => {
  const posts = [
    { uri: 'at://x/app.bsky.feed.post/a', record: { text: URL_449 } },
    { uri: 'at://x/app.bsky.feed.post/b', record: null },
  ]
  assert.equal(findPostedUri(posts, URL_449), null)
})
