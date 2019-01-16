import getMilestones from '~/apollo/queries/getMilestones.gql';

import { SiteConfig, SiteConfigRepository, SiteConfigContact } from '~/types/SiteConfig';

import axios from '~/plugins/axios';

import * as MutationTypes from '~/store/MutationTypes';
import * as ActionTypes from '~/store/ActionTypes';
import { GHDigest } from '~/types/GitHubApi';

export interface RootState extends SiteConfig {
  digest: GHDigest | null;
}

export const state = (): RootState => ({
  title: '',
  description: '',
  baseUrl: '',
  rssUrl: '',
  issueRepository: {
    owner: '',
    name: ''
  },
  contact: {
    name: '',
    link: ''
  },
  authors: [],
  digest: null
} as RootState);

export const mutations = {
  [MutationTypes.UPDATE_TITLE](state: RootState, title: string) {
    state.title = title;
  },
  [MutationTypes.UPDATE_DESCRIPTION](state: RootState, description: string) {
    state.description = description;
  },
  [MutationTypes.UPDATE_BASE_URL](state: RootState, url: string) {
    state.baseUrl = url;
  },
  [MutationTypes.UPDATE_RSS_URL](state: RootState, rssUrl: string) {
    state.rssUrl = rssUrl;
  },
  [MutationTypes.UPDATE_ISSUE_REPOSITORY](state: RootState, repo: SiteConfigRepository) {
    state.issueRepository = repo;
  },
  [MutationTypes.UPDATE_CONTACT](state: RootState, contact: SiteConfigContact) {
    state.contact = contact;
  },
  [MutationTypes.UPDATE_AUTHORS](state: RootState, authors: Array<SiteConfigContact>) {
    state.authors = authors;
  },
  [MutationTypes.UPDATE_DIGEST](state: RootState, { digest }: { digest: GHDigest }) {
    if (state.digest == null) {
      state.digest = digest;
    } else {
      state.digest.milestones.nodes = state.digest.milestones.nodes.concat(digest.milestones.nodes);

      const pageInfo = digest.milestones.pageInfo;
      state.digest.milestones.pageInfo.hasNextPage = pageInfo.hasNextPage;
      state.digest.milestones.pageInfo.endCursor = pageInfo.endCursor;
    }
  }
};


export const actions = {
  async nuxtServerInit({ commit, dispatch }, { app, env }) {
    const { SITE_CONFIG: siteConfigStr } = env;
    const siteConfigs: SiteConfig = JSON.parse(siteConfigStr);

    commit(MutationTypes.UPDATE_TITLE, siteConfigs.title);
    commit(MutationTypes.UPDATE_DESCRIPTION, siteConfigs.description);
    commit(MutationTypes.UPDATE_BASE_URL, siteConfigs.baseUrl);
    commit(MutationTypes.UPDATE_RSS_URL, siteConfigs.rssUrl);
    commit(MutationTypes.UPDATE_ISSUE_REPOSITORY, siteConfigs.issueRepository);
    commit(MutationTypes.UPDATE_CONTACT, siteConfigs.contact);
    commit(MutationTypes.UPDATE_AUTHORS, siteConfigs.authors);

    await dispatch(ActionTypes.FETCH_INITIAL_DIGEST);
  },

  async [ActionTypes.FETCH_INITIAL_DIGEST]({ commit }) {
    let data;
    if (process.server) {
      data = JSON.parse(require('fs').readFileSync('./static/api/index.json', 'utf8'));
    } else {
      let res = await axios.get('/api/index.json');
      data = res.data;
    }
    commit(MutationTypes.UPDATE_DIGEST, { digest: data });
  },

  async [ActionTypes.FETCH_DIGEST]({ commit }, payload: { cursor: string }) {
    const data: GHDigest = (await axios.get(`/api/${payload.cursor}.json`)).data;
    commit(MutationTypes.UPDATE_DIGEST, {digest: data});
  }
};
