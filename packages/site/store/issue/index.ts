import type { ActionTree, MutationTree, GetterTree } from 'vuex'
import { GHMilestone } from "site-types/GitHubApi";
import { RootState } from '..';


export const state = () => ({
  currentMilestoneId: null as string | null,
  milestones: {} as { [milestoneId: string]: GHMilestone }
})

export type IssueState = ReturnType<typeof state>

export const getters: GetterTree<IssueState, RootState> = {
  currentMilestone: (state) => {
    const milestoneId = state.currentMilestoneId
    if (milestoneId) {
      return state.milestones[milestoneId] ?? null
    } else {
      return null
    }
  }
}

export const mutations: MutationTree<IssueState> = {
  UPDATE_CURRENT_MILESTONE(state: IssueState, { milestoneId }: { milestoneId: string }) {
    state.currentMilestoneId = milestoneId
  },
  ADD_MILESTONE(state: IssueState, { milestoneId, milestone }: { milestoneId: string, milestone: GHMilestone }) {
    state.milestones = {
      ...state.milestones,
      [milestoneId]: milestone
    }
  }
}

export const actions: ActionTree<IssueState, RootState> = {
  async fetchById({ commit }, { milestoneId }: { milestoneId: string }) {
    commit('UPDATE_CURRENT_MILESTONE', { milestoneId })
    const milestone = await this.$api.get<GHMilestone>(`/api/issue/${milestoneId}.json`)
    commit('ADD_MILESTONE', { milestoneId, milestone })
  }
}
