import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { SiteConfig } from 'site-types/SiteConfig'
import { ApiClient } from '../data/api'

declare module '@nuxt/types/config/runtime' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
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

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: ApiClient
    $config: NuxtRuntimeConfig
  }
}
