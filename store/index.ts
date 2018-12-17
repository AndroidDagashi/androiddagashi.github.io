import getMilestones from '~/apollo/queries/getMilestones.gql';
import { SiteConfig, SiteConfigRepository, SiteConfigContact } from '~/types/SiteConfig';
import * as MutationTypes from '~/store/MutationTypes';

export interface RootState extends SiteConfig {

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
  authors: []
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
  }
};


export const actions = {
  async nuxtServerInit({ commit, state }, { app, env }) {
    const { SITE_CONFIG: siteConfigStr } = env;
    const siteConfigs: SiteConfig = JSON.parse(siteConfigStr);

    commit(MutationTypes.UPDATE_TITLE, siteConfigs.title);
    commit(MutationTypes.UPDATE_DESCRIPTION, siteConfigs.description);
    commit(MutationTypes.UPDATE_BASE_URL, siteConfigs.baseUrl);
    commit(MutationTypes.UPDATE_RSS_URL, siteConfigs.rssUrl);
    commit(MutationTypes.UPDATE_ISSUE_REPOSITORY, siteConfigs.issueRepository);
    commit(MutationTypes.UPDATE_CONTACT, siteConfigs.contact);
    commit(MutationTypes.UPDATE_AUTHORS, siteConfigs.authors);
  }
};
