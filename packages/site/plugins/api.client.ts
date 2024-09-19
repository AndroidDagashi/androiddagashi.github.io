import type { ApiClient, Options } from '../data/api'
import { defineNuxtPlugin } from '#imports'

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

export default defineNuxtPlugin((nuxtApp) => {
  const client = new ClientApiClient({
    baseURL: nuxtApp.$config.public.apiEndpoint,
  })

  nuxtApp.provide('api', client)
})
