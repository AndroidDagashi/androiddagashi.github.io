import { readFileSync } from 'fs'
import { resolve } from 'path'
import { defineNuxtPlugin } from '#app'

interface ApiClient {
  get<T>(url: string): Promise<T>
}

class ServerApiClient implements ApiClient {
  private readonly publicDir: string

  constructor(publicDir: string) {
    this.publicDir = publicDir
  }

  get<T>(url: string): Promise<T> {
    const filePath = resolve(this.publicDir, `.${url}`)
    const data = JSON.parse(readFileSync(filePath, 'utf8'))
    return Promise.resolve(data)
  }
}

export default defineNuxtPlugin({
  name: 'api-server',
  setup() {
    // packages/site/public からの相対パス
    const publicDir = resolve(process.cwd(), 'public')
    const client = new ServerApiClient(publicDir)

    return {
      provide: {
        api: client,
      },
    }
  },
})
