import type { ActionTree, MutationTree, GetterTree } from 'vuex'

import { GHDigest, GHDigestMilestone, GHPageInfo } from 'site-types/GitHubApi'

export const state = () => ({
  initialized: false,
  digests: [] as GHDigestMilestone[],
  // pageInfo for digests
  pageInfo: null as GHPageInfo | null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  digests: (state) => state.digests,
  pageInfo: (state) => state.pageInfo,
}

export const mutations: MutationTree<RootState> = {
  UPDATE_DIGESTS(state: RootState, { digest }: { digest: GHDigest }): void {
    state.digests = [...state.digests, ...digest.milestones.nodes]

    const newPageInfo = digest.milestones.pageInfo
    if (state.pageInfo) {
      state.pageInfo = {
        ...state.pageInfo,
        hasNextPage: newPageInfo.hasNextPage,
        endCursor: newPageInfo.endCursor,
      }
    } else {
      state.pageInfo = newPageInfo
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
    commit('UPDATE_DIGESTS', { digest: data })
  },

  async fetchNextDigests({ commit }, payload: { cursor: string }) {
    const data = await this.$api.get<GHDigest>(`/api/${payload.cursor}.json`)
    commit('UPDATE_DIGESTS', { digest: data })
  },
}
