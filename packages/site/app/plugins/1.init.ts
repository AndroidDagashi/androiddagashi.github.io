import { defineNuxtPlugin } from '#app'
import { useDigestStore } from '~/store/digest'

export default defineNuxtPlugin({
  name: 'init',
  async setup(nuxtApp) {
    // Nuxt 4: setup関数内でcomposableを使用
    const digestStore = useDigestStore()

    if (!digestStore.initialized) {
      await digestStore.fetchInitialDigests()
      digestStore.setInitialized(true)
    }
  },
})
