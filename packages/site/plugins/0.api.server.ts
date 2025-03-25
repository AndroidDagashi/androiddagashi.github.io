import { readFileSync } from 'fs'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

interface ApiClient {
  get<T>(url: string): Promise<T>
}

class ServerApiClient implements ApiClient {
  private readonly baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  get<T>(url: string): Promise<T> {
    const data = JSON.parse(readFileSync(`./public${url}`, 'utf8'))
    return Promise.resolve(data)
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const client = new ServerApiClient(config.public.apiEndpoint)

  return {
    provide: {
      api: client,
    },
  }
})
