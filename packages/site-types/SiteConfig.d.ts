export interface SiteConfig {
  title: string
  description: string
  baseUrl: string
  issueRepository: RepositoryConfig
  rssUrl: string
  contact: ContactInfo
  authors: ContactInfo[]
}

export interface RepositoryConfig {
  owner: string
  name: string
}

export interface ContactInfo {
  name: string
}
