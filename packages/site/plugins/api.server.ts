import fs from 'fs'
import type { Context } from '@nuxt/types'
import type { ApiClient, Options } from '../data/api'

class ServerApiClient implements ApiClient {
  private readonly options: Options

  constructor(options: Options) {
    this.options = options
  }

  get<T>(url: string): Promise<T> {
    const data = JSON.parse(fs.readFileSync(`./static${url}`, 'utf8'))
    return Promise.resolve(data)
  }
}

export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): Promise<void> | void => {
  const client = new ServerApiClient({ baseURL: context.$config.apiEndpoint })

  context.$api = client

  inject('api', client)
}
