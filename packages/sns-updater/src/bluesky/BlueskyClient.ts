import type { AtpAgentFetchHandlerResponse } from '@atproto/api'
import { BskyAgent, RichText, stringifyLex } from '@atproto/api'
import type BlueskyConfig from './BlueskyConfig'
import fetch from 'node-fetch'

function configureBlueskyFetch() {
  BskyAgent.configure({
    fetch: async function (
      httpUri: string,
      httpMethod: string,
      httpHeaders: { [x: string]: string },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      httpReqBody: any
    ): Promise<AtpAgentFetchHandlerResponse> {
      const mimeType =
        httpHeaders['Content-Type'] || httpHeaders['content-type']
      let body
      if (mimeType?.startsWith('application/json') === true) {
        body = stringifyLex(httpReqBody)
      } else {
        body = httpReqBody
      }

      const res = await fetch(httpUri, {
        method: httpMethod,
        headers: httpHeaders,
        body,
      })

      const resStatus = res.status
      const resHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        resHeaders[key] = value
      })
      const resMimeType =
        resHeaders['Content-Type'] || resHeaders['content-type']
      let resBody
      if (resMimeType) {
        if (resMimeType.startsWith('application/json')) {
          resBody = await res.json()
        } else if (resMimeType.startsWith('text/')) {
          resBody = await res.text()
        } else {
          throw new Error(`Unsupported mime type: ${resMimeType}`)
        }
      }

      return {
        status: resStatus,
        headers: resHeaders,
        body: resBody,
      }
    },
  })
}

export class BlueskyClient {
  private readonly agent: BskyAgent

  constructor(readonly config: BlueskyConfig) {
    this.agent = new BskyAgent({
      service: this.config.service,
    })
    configureBlueskyFetch()
  }

  async login(): Promise<void> {
    await this.agent.login({
      identifier: this.config.identifier,
      password: this.config.password,
    })
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
