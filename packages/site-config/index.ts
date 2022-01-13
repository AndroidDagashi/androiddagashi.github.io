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
  // twitter account
  contact: { name: 'AndroidDagashi' },
  // twitter account
  authors: [
    { name: '_yshrsmz' },
    { name: 'hydrakecat' },
    { name: 'STAR_ZERO' },
    { name: 'stsn_jp' },
    { name: 'new_runnable' },
  ],
} as NuxtRuntimeConfig & SiteConfig
