import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig } from 'axios'

export class ApiClient {
  private readonly axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
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
  const client = new ApiClient(context.$axios)

  context.$api = client
  inject('api', client)
}
