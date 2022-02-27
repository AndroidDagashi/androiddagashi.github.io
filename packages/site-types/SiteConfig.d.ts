export interface SiteConfig {
  title: string
  description: string
  baseUrl: string
  issueRepository: RepositoryConfig
  rssUrl: string
  contact: TwitterInfo
  authors: TwitterInfo[]
  links: LinkInfo[]
}

export const LinkType = 'github' | 'twitter' | 'mail'

export interface RepositoryConfig {
  owner: string
  name: string
}

export interface TwitterInfo {
  name: string
}

export interface LinkInfo {
  name: LinkType
  url: string
  icon: string
}
