import { ApiClient } from '~/plugins/api'

declare module '@nuxt/types' {
  interface Context {
    $api: ApiClient
  }

  interface NuxtAppOptions {
    $api: ApiClient
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiClient
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: ApiClient
  }
}
