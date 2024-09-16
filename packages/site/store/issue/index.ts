import type { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import type { GHMilestone } from 'site-types/GitHubApi'
import type { RootState } from '..'

export const state = () => ({
  currentMilestoneId: null as string | null,
  milestones: {} as { [milestoneId: string]: GHMilestone },
})

export type IssueState = ReturnType<typeof state>

export interface IssueGetters extends GetterTree<IssueState, RootState> {
  currentMilestone(state: IssueState): GHMilestone | null
}

export const getters: IssueGetters = {
  currentMilestone: (state) => {
    const milestoneId = state.currentMilestoneId
    if (milestoneId) {
      return state.milestones[milestoneId] ?? null
    } else {
      return null
    }
  },
}

export interface IssueMutations extends MutationTree<IssueState> {
  UPDATE_CURRENT_MILESTONE(
    state: IssueState,
    { milestoneId }: { milestoneId: string }
  ): void
  ADD_MILESTONE(
    state: IssueState,
    { milestoneId, milestone }: { milestoneId: string; milestone: GHMilestone }
  ): void
}

export const mutations: IssueMutations = {
  UPDATE_CURRENT_MILESTONE(
    state: IssueState,
    { milestoneId }: { milestoneId: string }
  ) {
    state.currentMilestoneId = milestoneId
  },
  ADD_MILESTONE(
    state: IssueState,
    { milestoneId, milestone }: { milestoneId: string; milestone: GHMilestone }
  ) {
    state.milestones = {
      ...state.milestones,
      [milestoneId]: milestone,
    }
  },
}

export interface IssueActions extends ActionTree<IssueState, RootState> {
  fetchById: (
    context: ActionContext<IssueState, RootState>,
    { milestoneId }: { milestoneId: string }
  ) => Promise<void>
}

export const actions: IssueActions = {
  async fetchById({ commit }, { milestoneId }: { milestoneId: string }) {
    commit('UPDATE_CURRENT_MILESTONE', { milestoneId })

    let milestone = await this.$api.get<GHMilestone>(
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

    commit('ADD_MILESTONE', { milestoneId, milestone })
  },
}
