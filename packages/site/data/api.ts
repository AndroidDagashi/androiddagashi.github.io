export interface Options {
  baseURL: string
}

export interface ApiClient {
  get<T>(url: string): Promise<T>
}
