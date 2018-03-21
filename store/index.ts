import getMilestones from '~/apollo/queries/getMilestones.gql';

export type GHPageInfo = {
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};


export type GHAuthor = {
  login: string;
  url: string;
  avatarUrl: string;
};


export type GHComment = {
  body: string;
  author: GHAuthor;
};

export type GHComments = {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: Array<GHComment>;
};

export type GHLabel = {
  name: string;
  description: string | null;
  color: string;
};

export type GHLabels = {
  nodes: Array<GHLabel>;
};

export type GHIssue = {
  url: string;
  title: string;
  body: string;
  labels: GHLabels;
};

export type GHIssues = {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: Array<GHIssue>;
};

export type GHMilestone = {
  id: string;
  number: number;
  url: string;
  title: string;
  description: string | null;
  issues: GHIssues;
};

export type GHMilestones = {
  totalCount: number;
  pageInfo: GHPageInfo;
  nodes: Array<GHMilestone>;
};

export type GHRepository = {
  name: string;
  description: string | null;
  milestones: GHMilestones;
};


export const state = () => ({
  repoOwner: '',
  repoName: '',
  fetchMilestonesPerPage: 20,
  fetchIssuesPerMilestone: 20,
  fetchCommentsPerIssue: 20,
  totalCount: 0,
  milestones: [] as GHMilestone[],
  pageInfo: {} as GHPageInfo
});


export const mutations = {
  setRepoOwner(state, repoOwner: string) {
    state.repoOwner = repoOwner;
  },
  setRepoName(state, repoName: string) {
    state.repoName = repoName;
  },
  setMilestones(state, { totalCount, nodes, pageInfo }: GHMilestones) {
    state.totalCount = totalCount;
    state.milestones = nodes;
    state.pageInfo = pageInfo;
  }
};


export const actions = {
  async nuxtServerInit({ commit, state }, { app, env }) {
    const { GH_REPO_OWNER: repoOwner, GH_REPO_NAME: repoName } = env;

    commit('setRepoOwner', repoOwner);
    commit('setRepoName', repoName);

    try {
      const { data } = await app.apolloProvider.defaultClient.query({
        query: getMilestones,
        variables: {
          repoOwner: repoOwner,
          repoName: repoName,
          fetchMilestonesPerPage: state.fetchMilestonesPerPage,
          fetchIssuesPerMilestone: state.fetchIssuesPerMilestone,
          fetchCommentsPerIssue: state.fetchCommentsPerIssue
        }
      });
      commit('setMilestones', data.repository.milestones as Array<GHMilestone>);
    } catch (err) {
      console.error(err);
    }
  }
};
