
export interface SiteConfigRepository {
  owner: string;
  name: string;
}

export interface SiteConfigContact {
  name: string;
  link: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  baseUrl: string;
  rssUrl: string;
  issueRepository: SiteConfigRepository;
  contact: SiteConfigContact;
  authors: Array<SiteConfigContact>;
}
