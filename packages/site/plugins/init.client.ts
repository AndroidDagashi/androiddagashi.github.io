import { defineNuxtPlugin } from '#imports'
import type { RootState } from '~/store'

/**
 * dispatch `nuxtServerInit` manually if state is not initialized
 * https://github.com/nuxt/nuxt.js/issues/7051#issuecomment-604914461
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  if (!(nuxtApp.$store.state as RootState).initialized) {
    await nuxtApp.$store.dispatch('nuxtServerInit', nuxtApp.nuxt2Context)
  }
})
