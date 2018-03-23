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


export type GHDigestIssue = {
  title: string;
};

export type GHDigestMilestone = {
  id: string;
  number: string;
  url: string;
  title: string;
  description: string;
  issues: {
    totalCount: number;
    nodes: Array<GHDigestIssue>;
  };
};

export type GHDigest = {
  name: string;
  url: string;
  milestones: {
    totalCount: number;
    nodes: Array<GHDigestMilestone>;
  };
};


export const state = () => ({
  repoOwner: '',
  repoName: ''
});


export const mutations = {
  setRepoOwner(state, repoOwner: string) {
    state.repoOwner = repoOwner;
  },
  setRepoName(state, repoName: string) {
    state.repoName = repoName;
  }
};


export const actions = {
  async nuxtServerInit({ commit, state }, { app, env }) {
    const { GH_REPO_OWNER: repoOwner, GH_REPO_NAME: repoName } = env;

    commit('setRepoOwner', repoOwner);
    commit('setRepoName', repoName);
  }
};
