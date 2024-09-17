import { CommitOptions, Store } from 'vuex'

declare module 'vuex' {
  interface Commit {
    <P = any>(type: string, payload?: P, options?: CommitOptions): void
  }
}

declare module '@nuxt/bridge-schema' {
  interface NuxtAppCompat {
    $store: Store<any>
  }
}
