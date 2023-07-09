import type { Context } from '@nuxt/types'

interface Config {
  baseURL: string
}
export class ApiClient {
  private readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  async get<T>(url: string): Promise<T> {
    let data: T
    if (process.server) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      data = JSON.parse(require('fs').readFileSync(`./static${url}`, 'utf8'))
    } else {
      const res = await fetch(`${this.config.baseURL}${url}`)
      data = await res.json()
    }
    return data
  }
}

export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): Promise<void> | void => {
  const client = new ApiClient({ baseURL: context.$config.apiEndpoint })

  context.$api = client
  inject('api', client)
}
