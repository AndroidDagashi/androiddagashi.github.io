interface Config {
  baseURL: string
}
export class ApiClient {
  private readonly config: Config

  constructor(config: Config) {
    this.config = config
  }

  async get<T>(url: string): Promise<T> {
    let data: T
    if (process.server) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      data = JSON.parse(require('fs').readFileSync(`./static${url}`, 'utf8'))
    } else {
      const res = await fetch(`${this.config.baseURL}${url}`)
      data = await res.json()
    }
    return data
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const { apiEndpoint } = useRuntimeConfig()
  const client = new ApiClient({ baseURL: apiEndpoint })

  nuxtApp.provide('api', client)
})
