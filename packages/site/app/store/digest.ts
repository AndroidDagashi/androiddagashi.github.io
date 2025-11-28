import { defineStore } from 'pinia'
import type {
  GHDigest,
  GHDigestMilestone,
  GHPageInfo,
} from 'site-types/GitHubApi'
import { useNuxtApp } from '#app'

interface DigestState {
  initialized: boolean
  digests: GHDigestMilestone[]
  pageInfo: GHPageInfo | null
}

export const useDigestStore = defineStore('digest', {
  state: (): DigestState => ({
    initialized: false,
    digests: [],
    pageInfo: null,
  }),

  getters: {
    getDigests: (state) => state.digests,
    getPageInfo: (state) => state.pageInfo,
  },

  actions: {
    updateDigests(digest: GHDigest) {
      this.digests = [...this.digests, ...digest.milestones.nodes]

      const newPageInfo = digest.milestones.pageInfo
      if (this.pageInfo) {
        this.pageInfo = {
          ...this.pageInfo,
          hasNextPage: newPageInfo.hasNextPage,
          endCursor: newPageInfo.endCursor,
        }
      } else {
        this.pageInfo = newPageInfo
      }
    },

    setInitialized(initialized: boolean) {
      this.initialized = initialized
    },

    async fetchInitialDigests() {
      const { $api } = useNuxtApp()
      const data = await $api.get<GHDigest>('/api/index.json')
      this.updateDigests(data)
    },

    async fetchNextDigests(cursor: string | undefined) {
      if (!cursor) {
        return
      }

      const { $api } = useNuxtApp()
      const data = await $api.get<GHDigest>(`/api/${cursor}.json`)
      this.updateDigests(data)
    },
  },
})
