import { Context } from '@nuxt/types'
import { RootState } from '~/store'

/**
 * dispatch `nuxtServerInit` manually if state is not initialized
 * https://github.com/nuxt/nuxt.js/issues/7051#issuecomment-604914461
 */
export default async function ({ app, store }: Context): Promise<void> {
  if (!(store.state as RootState).initialized) {
    await store.dispatch('nuxtServerInit', app.context)
  }
}
