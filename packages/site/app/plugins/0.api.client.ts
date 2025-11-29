import { defineNuxtPlugin } from '#app'

interface ApiClient {
  get<T>(url: string): Promise<T>
}

class ClientApiClient implements ApiClient {
  async get<T>(url: string): Promise<T> {
    // クライアントサイドでは相対パスで十分（同じオリジンへのリクエスト）
    const res = await fetch(url)
    return await res.json()
  }
}

export default defineNuxtPlugin({
  name: 'api-client',
  setup() {
    const client = new ClientApiClient()

    return {
      provide: {
        api: client,
      },
    }
  },
})
