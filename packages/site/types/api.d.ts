import type { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import type { SiteConfig } from 'site-types/SiteConfig'
import type { ApiClient } from '../data/api'

declare module '@nuxt/types/config/runtime' {
   
  interface NuxtRuntimeConfig extends SiteConfig {
    apiEndpoint: string
  }
}
declare module '@nuxt/types' {
  interface Context {
    $api: ApiClient
    $config: NuxtRuntimeConfig
  }

  interface NuxtAppOptions {
    $api: ApiClient
    $config: NuxtRuntimeConfig
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiClient
    $config: NuxtRuntimeConfig
  }
}
