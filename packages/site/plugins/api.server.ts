import { readFileSync } from 'fs'
import type { ApiClient } from '~/data/api'

class ServerApiClient implements ApiClient {
  get<T>(url: string): Promise<T> {
    const data: T = JSON.parse(readFileSync(`./static${url}`, 'utf8')) as T

    return Promise.resolve(data)
  }
}

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()

  // FIXME: remove cast to string when RuntimeConfig is fully typed
  const client = new ServerApiClient()

  nuxtApp.provide('api', client)
})
