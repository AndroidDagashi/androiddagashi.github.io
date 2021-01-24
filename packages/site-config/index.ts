import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { SiteConfig } from 'site-types/SiteConfig'

export const siteConfig = {
  title: 'Android Dagashi',
  description: 'Weekly Android developer news digest in Japanese',
  baseUrl: 'https://androiddagashi.github.io',
  issueRepository: {
    owner: 'AndroidDagashi',
    name: 'AndroidDagashi',
  },
  rssUrl: 'http://feeds.feedburner.com/AndroidDagashi',
  contact: {
    name: '@AndroidDagashi',
    link: 'https://twitter.com/AndroidDagashi',
  },
  authors: [
    { name: '@_yshrsmz', link: 'https://twitter.com/_ysrhsmz' },
    { name: '@hydrakecat', link: 'https://twitter.com/hydrakecat' },
    { name: '@STAR_ZERO', link: 'https://twitter.com/STAR_ZERO' },
    { name: '@stsn_jp', link: 'https://twitter.com/stsn_jp' },
  ],
} as NuxtRuntimeConfig & SiteConfig
