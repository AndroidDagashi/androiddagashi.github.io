import { defineStore } from 'pinia'
import type { GHMilestone } from 'site-types/GitHubApi'
import { useNuxtApp } from '#app'

export const useIssueStore = defineStore('issue', {
  actions: {
    // milestone を取得し minimized コメントを除外して返す純粋な fetch。
    // キャッシュは呼び出し側の useAsyncData (key 単位) が担うため store では保持しない。
    async fetchById(milestoneId: string): Promise<GHMilestone> {
      const { $api } = useNuxtApp()
      let milestone = await $api.get<GHMilestone>(
        `/api/issue/${milestoneId}.json`
      )

      // exclude minimized comments
      milestone = {
        ...milestone,
        issues: {
          ...milestone.issues,
          nodes: milestone.issues.nodes.map((issue) => {
            return {
              ...issue,
              comments: {
                ...issue.comments,
                nodes: issue.comments.nodes.filter(
                  (comment) => !comment.isMinimized
                ),
              },
            }
          }),
        },
      }

      return milestone
    },
  },
})
