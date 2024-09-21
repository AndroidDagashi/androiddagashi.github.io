import fs from 'fs'
import type { ApiClient, Options } from '../data/api'
import { defineNuxtPlugin } from '#imports'

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

export default defineNuxtPlugin((nuxtApp) => {
  const client = new ServerApiClient({
    baseURL: nuxtApp.$config.public.apiEndpoint,
  })

  nuxtApp.provide('api', client)
})
