import getMilestones from '~/apollo/queries/getMilestones.gql';
import { SiteConfig, SiteConfigRepository, SiteConfigContact } from '~/types/SiteConfig';

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
  setTitle(state: RootState, title: string){
    state.title = title;
  },
  setDescription(state: RootState, description: string){
    state.description = description;
  },
  setBaseUrl(state: RootState, url: string) {
    state.baseUrl = url;
  },
  setRssUrl(state: RootState, rssUrl: string) {
    state.rssUrl = rssUrl;
  },
  setIssueRepository(state: RootState, repo: SiteConfigRepository){
    state.issueRepository = repo;
  },
  setContact(state: RootState, contact: SiteConfigContact){
    state.contact = contact;
  },
  setAuthors(state: RootState, authors: Array<SiteConfigContact>){
    state.authors = authors;
  }
};


export const actions = {
  async nuxtServerInit({ commit, state }, { app, env }) {
    const { SITE_CONFIG: siteConfigStr } = env;
    const siteConfigs: SiteConfig = JSON.parse(siteConfigStr);

    commit('setTitle', siteConfigs.title);
    commit('setDescription', siteConfigs.description);
    commit('setBaseUrl', siteConfigs.baseUrl);
    commit('setRssUrl', siteConfigs.rssUrl);
    commit('setIssueRepository', siteConfigs.issueRepository);
    commit('setContact', siteConfigs.contact);
    commit('setAuthors', siteConfigs.authors);
  }
};
