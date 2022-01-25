import { Context } from '@nuxt/types'
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

export class ApiClient {
  private readonly axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<T> {
    let data: T
    if (process.server) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      data = JSON.parse(require('fs').readFileSync(`./static${url}`, 'utf8'))
    } else {
      const res = await this.axios.get<T>(url, config)
      data = res.data
    }
    return data
  }
}

export default (
  context: Context,
  inject: (key: string, value: unknown) => void
): Promise<void> | void => {
  const client = new ApiClient(
    axios.create({ baseURL: context.$config.apiEndpoint })
  )

  context.$api = client
  inject('api', client)
}
