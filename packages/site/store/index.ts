import type {
  ActionTree,
  MutationTree,
  GetterTree,
  ActionContext,
  Store,
} from 'vuex'

import type { GitHubApi } from 'site-types'

export const state = () => ({
  initialized: false,
  digests: [] as GitHubApi.GHDigestMilestone[],
  // pageInfo for digests
  pageInfo: null as GitHubApi.GHPageInfo | null,
})

export type RootState = ReturnType<typeof state>

export interface RootGetters extends GetterTree<RootState, RootState> {
  digests: (state: RootState) => GitHubApi.GHDigestMilestone[]
  pageInfo: (state: RootState) => GitHubApi.GHPageInfo | null
}

export const getters: RootGetters = {
  digests: (state) => state.digests,
  pageInfo: (state) => state.pageInfo,
}

export const mutations: MutationTree<RootState> = {
  UPDATE_DIGESTS(
    state: RootState,
    { digest }: { digest: GitHubApi.GHDigest }
  ): void {
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

export interface RootActions extends ActionTree<RootState, RootState> {
  nuxtServerInit: (
    this: Store<RootState>,
    context: ActionContext<RootState, RootState>
  ) => Promise<void>
  fetchInitialDigests: (
    this: Store<RootState>,
    context: ActionContext<RootState, RootState>
  ) => Promise<void>
  fetchNextDigests: (
    this: Store<RootState>,
    context: ActionContext<RootState, RootState>,
    payload: { cursor: string }
  ) => Promise<void>
}

export const actions: RootActions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('fetchInitialDigests')

    commit('UPDATE_INITIALIZED', true)
  },

  async fetchInitialDigests({ commit }) {
    const data = await this.$api.get<GitHubApi.GHDigest>('/api/index.json')
    commit('UPDATE_DIGESTS', { digest: data })
  },

  async fetchNextDigests({ commit }, payload: { cursor: string }) {
    const data = await this.$api.get<GitHubApi.GHDigest>(
      `/api/${payload.cursor}.json`
    )
    commit('UPDATE_DIGESTS', { digest: data })
  },
}
