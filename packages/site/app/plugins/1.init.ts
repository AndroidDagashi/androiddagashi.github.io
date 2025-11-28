import { defineNuxtPlugin } from '#app'
import { useDigestStore } from '~/store/digest'

export default defineNuxtPlugin(async () => {
  const digestStore = useDigestStore()

  if (!digestStore.initialized) {
    await digestStore.fetchInitialDigests()
    digestStore.setInitialized(true)
  }
})
