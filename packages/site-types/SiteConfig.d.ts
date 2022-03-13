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

export type LinkType = 'github' | 'twitter' | 'mail' | 'rss'

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
