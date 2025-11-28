import { defineNuxtPlugin, useRuntimeConfig } from '#app'

interface ApiClient {
  get<T>(url: string): Promise<T>
}

class ClientApiClient implements ApiClient {
  private readonly baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${url}`)
    return await res.json()
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const client = new ClientApiClient(config.public.apiEndpoint)

  return {
    provide: {
      api: client,
    },
  }
})
