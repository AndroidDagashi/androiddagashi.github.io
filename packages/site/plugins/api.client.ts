import type { Context } from '@nuxt/types'
import type { ApiClient, Options } from '../data/api'

class ClientApiClient implements ApiClient {
  private readonly options: Options

  constructor(options: Options) {
    this.options = options
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(`${this.options.baseURL}${url}`)
    return await res.json()
  }
}

export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): Promise<void> | void => {
  const client = new ClientApiClient({ baseURL: context.$config.apiEndpoint })

  context.$api = client

  inject('api', client)
}
