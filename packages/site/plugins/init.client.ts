import { Context } from '@nuxt/types'
import { RootState } from '~/store'

export default async function ({ app, store }: Context): Promise<void> {
  if (!(store.state as RootState).initialized) {
    await store.dispatch('nuxtServerInit', app.context)
  }
}
