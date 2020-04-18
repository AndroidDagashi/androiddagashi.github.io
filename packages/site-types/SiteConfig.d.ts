export interface SiteConfig {
  title: string
  description: string
  baseUrl: string
  issueRepository: RepositoryConfig
  rssUrl: string
  constact: ContactInfo
  authors: ContactInfo[]
}

export interface RepositoryConfig {
  owner: string
  name: string
}

export interface ContactInfo {
  name: string
  link: string
}
