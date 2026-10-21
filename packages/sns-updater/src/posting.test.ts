import { test } from 'node:test'
import assert from 'node:assert/strict'
import { findEarliestPost } from './posting'

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

test('finds an existing post that links to the milestone', () => {
  const posts = [
    post('at://x/app.bsky.feed.post/new', URL_449),
    post('at://x/app.bsky.feed.post/old', 'https://example.com/448'),
  ]
  assert.deepEqual(findEarliestPost(posts, URL_449), {
    url: 'at://x/app.bsky.feed.post/new',
    postedAt: '2026-10-18T11:32:28.283Z',
  })
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
  assert.equal(
    findEarliestPost(posts, URL_449)?.url,
    'at://x/app.bsky.feed.post/first'
  )
})

test('compares createdAt as a time even when the offsets differ', () => {
  // 20:00+09:00 is 11:00Z, which is earlier than 11:30Z, though it sorts
  // later as a string.
  const posts = [
    post('at://x/app.bsky.feed.post/utc', URL_449, '2026-10-18T11:30:00.000Z'),
    post('at://x/app.bsky.feed.post/jst', URL_449, '2026-10-18T20:00:00+09:00'),
  ]
  assert.equal(
    findEarliestPost(posts, URL_449)?.url,
    'at://x/app.bsky.feed.post/jst'
  )
})

test('returns null when no post links to the milestone', () => {
  const posts = [post('at://x/app.bsky.feed.post/a', 'https://example.com/448')]
  assert.equal(findEarliestPost(posts, URL_449), null)
})

test('ignores posts without an external embed', () => {
  const posts = [
    { uri: 'at://x/app.bsky.feed.post/a', record: { text: URL_449 } },
    { uri: 'at://x/app.bsky.feed.post/b', record: null },
  ]
  assert.equal(findEarliestPost(posts, URL_449), null)
})
