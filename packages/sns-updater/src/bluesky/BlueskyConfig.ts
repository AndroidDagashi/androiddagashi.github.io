export default class BlueskyConfig {
  readonly service = 'https://bsky.social'

  constructor(readonly identifier: string, readonly password: string) {}
}
