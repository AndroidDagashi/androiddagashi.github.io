import { defineStore } from 'pinia'
import type { GHMilestone } from 'site-types/GitHubApi'
import { useNuxtApp } from '#app'

interface IssueState {
  currentMilestoneId: string | null
  milestones: { [milestoneId: string]: GHMilestone }
}

export const useIssueStore = defineStore('issue', {
  state: (): IssueState => ({
    currentMilestoneId: null,
    milestones: {},
  }),

  getters: {
    currentMilestone: (state): GHMilestone | null => {
      const milestoneId = state.currentMilestoneId
      if (milestoneId) {
        return state.milestones[milestoneId] ?? null
      }
      return null
    },
  },

  actions: {
    updateCurrentMilestone(milestoneId: string) {
      this.currentMilestoneId = milestoneId
    },

    addMilestone(milestoneId: string, milestone: GHMilestone) {
      this.milestones = {
        ...this.milestones,
        [milestoneId]: milestone,
      }
    },

    async fetchById(milestoneId: string) {
      this.updateCurrentMilestone(milestoneId)

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

      this.addMilestone(milestoneId, milestone)
    },
  },
})
