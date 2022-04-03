import type { ActionTree, MutationTree, GetterTree } from 'vuex'

import { GHDigest } from 'site-types/GitHubApi'

export const state = () => ({
  initialized: false,
  digest: null as GHDigest | null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  UPDATE_DIGEST(
    state: RootState,
    { digest }: { digest: GHDigest }
  ): void {
    if (state.digest == null) {
      state.digest = digest
    } else {
      state.digest.milestones.nodes = state.digest.milestones.nodes.concat(
        digest.milestones.nodes
      )

      const pageInfo = digest.milestones.pageInfo
      state.digest.milestones.pageInfo.hasNextPage = pageInfo.hasNextPage
      state.digest.milestones.pageInfo.endCursor = pageInfo.endCursor
    }
  },
  UPDATE_INITIALIZED(state: RootState, initialized: boolean) {
    state.initialized = initialized
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('fetchInitialDigests')

    commit('UPDATE_INITIALIZED', true)
  },

  async fetchInitialDigests({ commit }) {
    const data = await this.$api.get<GHDigest>('/api/index.json')
    commit('UPDATE_DIGEST', { digest: data })
  },

  async fetchNextDigests({ commit }, payload: { cursor: string }) {
    const data = await this.$api.get<GHDigest>(`/api/${payload.cursor}.json`)
    commit('UPDATE_DIGEST', { digest: data })
  },
}
