import AtpAgent, { Agent, CredentialSession, RichText, stringifyLex } from '@atproto/api'
import type BlueskyConfig from './BlueskyConfig'
import type { FeedPost } from '../posting'

export class BlueskyClient {
  private readonly session: CredentialSession
  private readonly agent: Agent

  constructor(readonly config: BlueskyConfig) {
    this.session = new CredentialSession(
      new URL(this.config.service),
    )
    this.agent = new Agent(this.session)
  }

  async login(): Promise<void> {
    await this.session.login({
      identifier: this.config.identifier,
      password: this.config.password,
    })
  }

  /** Returns the account's own recent posts, excluding replies and reposts. */
  async getRecentPosts(): Promise<FeedPost[]> {
    const response = await this.agent.getAuthorFeed({
      actor: this.config.identifier,
      limit: 100,
      filter: 'posts_no_replies',
    })

    return response.data.feed
      .filter((item) => item.reason == null)
      .map((item) => ({ uri: item.post.uri, record: item.post.record }))
  }

  async post(
    message: string,
    meta: { url: string; title: string; description: string }
  ): Promise<{ uri: string; cid: string }> {
    const rt = new RichText({ text: message })
    await rt.detectFacets(this.agent)

    return await this.agent.post({
      text: rt.text,
      facets: rt.facets,
      embed: {
        external: {
          uri: meta.url,
          title: meta.title,
          description: meta.description,
          // thumb: undefined,
        },
        $type: 'app.bsky.embed.external',
      },
    })
  }
}
