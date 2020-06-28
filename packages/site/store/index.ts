import { ActionTree, MutationTree } from 'vuex'

import { GHDigest } from 'site-types/GitHubApi'
import {
  SiteConfig,
  ContactInfo,
  RepositoryConfig,
} from 'site-types/SiteConfig'

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
    state.authors = authors
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
  async nuxtServerInit({ commit, dispatch }, { env }) {
    const { SITE_CONFIG: siteConfigStr } = env
    const siteConfigs: SiteConfig = JSON.parse(siteConfigStr)

    commit(MutationTypes.UPDATE_TITLE, siteConfigs.title)
    commit(MutationTypes.UPDATE_DESCRIPTION, siteConfigs.description)
    commit(MutationTypes.UPDATE_BASE_URL, siteConfigs.baseUrl)
    commit(MutationTypes.UPDATE_RSS_URL, siteConfigs.rssUrl)
    commit(MutationTypes.UPDATE_ISSUE_REPOSITORY, siteConfigs.issueRepository)
    commit(MutationTypes.UPDATE_CONTACT, siteConfigs.contact)
    commit(MutationTypes.UPDATE_AUTHORS, siteConfigs.authors)

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
