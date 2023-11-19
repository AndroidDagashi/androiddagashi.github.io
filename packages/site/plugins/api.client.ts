import type { ApiClient, Options } from '~/data/api'

export class BrowserApiClient implements ApiClient {
  private readonly options: Options

  constructor(options: Options) {
    this.options = options
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(`${this.options.baseURL}${url}`)
    const data = (await res.json()) as T

    return data
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const nuxtApp = useNuxtApp()

  // FIXME: remove cast to string when RuntimeConfig is fully typed
  const client = new BrowserApiClient({ baseURL: config.public.apiEndpoint })

  nuxtApp.provide('api', client)
})
