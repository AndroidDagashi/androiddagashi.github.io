import { ActionTree, MutationTree, GetterTree } from 'vuex'

import { GHDigest } from 'site-types/GitHubApi'
import { ContactInfo, RepositoryConfig } from 'site-types/SiteConfig'

import * as GetterTypes from '~/store/GetterTypes'
import * as MutationTypes from '~/store/MutationTypes'
import * as ActionTypes from '~/store/ActionTypes'

export interface Divider {
  isDivider: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  initialized: false,
  title: '',
  description: '',
  baseUrl: '',
  rssUrl: '',
  issueRepository: {
    owner: '',
    name: '',
  } as RepositoryConfig,
  contact: {
    name: '',
    link: '',
  } as ContactInfo,
  authors: [] as ContactInfo[],
  digest: null as GHDigest | null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  [GetterTypes.GET_AUTHORS](state: RootState): ContactInfo[] {
    return state.authors
  },
}

export const mutations: MutationTree<RootState> = {
  [MutationTypes.UPDATE_TITLE](state: RootState, title: string): void {
    state.title = title
  },
  [MutationTypes.UPDATE_DESCRIPTION](
    state: RootState,
    description: string
  ): void {
    state.description = description
  },
  [MutationTypes.UPDATE_BASE_URL](state: RootState, url: string): void {
    state.baseUrl = url
  },
  [MutationTypes.UPDATE_RSS_URL](state: RootState, rssUrl: string): void {
    state.rssUrl = rssUrl
  },
  [MutationTypes.UPDATE_ISSUE_REPOSITORY](
    state: RootState,
    repo: RepositoryConfig
  ): void {
    state.issueRepository = repo
  },
  [MutationTypes.UPDATE_CONTACT](state: RootState, contact: ContactInfo): void {
    state.contact = contact
  },
  [MutationTypes.UPDATE_AUTHORS](
    state: RootState,
    authors: ContactInfo[]
  ): void {
    state.authors = authors.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    )
  },
  [MutationTypes.UPDATE_DIGEST](
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
  [MutationTypes.UPDATE_INITIALIZED](state: RootState, initialized: boolean) {
    state.initialized = initialized
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch }) {
    commit(MutationTypes.UPDATE_TITLE, this.$config.title)
    commit(MutationTypes.UPDATE_DESCRIPTION, this.$config.description)
    commit(MutationTypes.UPDATE_BASE_URL, this.$config.baseUrl)
    commit(MutationTypes.UPDATE_RSS_URL, this.$config.rssUrl)
    commit(MutationTypes.UPDATE_ISSUE_REPOSITORY, this.$config.issueRepository)
    commit(MutationTypes.UPDATE_CONTACT, this.$config.contact)
    commit(MutationTypes.UPDATE_AUTHORS, this.$config.authors)

    await dispatch(ActionTypes.FETCH_INITIAL_DIGEST)

    commit(MutationTypes.UPDATE_INITIALIZED, true)
  },

  async [ActionTypes.FETCH_INITIAL_DIGEST]({ commit }) {
    const data = await this.$api.get<GHDigest>('/api/index.json')
    commit(MutationTypes.UPDATE_DIGEST, { digest: data })
  },

  async [ActionTypes.FETCH_DIGEST]({ commit }, payload: { cursor: string }) {
    const data = await this.$api.get<GHDigest>(`/api/${payload.cursor}.json`)
    commit(MutationTypes.UPDATE_DIGEST, { digest: data })
  },
}
