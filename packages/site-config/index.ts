import { SiteConfig } from 'site-types/SiteConfig'

export const siteConfig: SiteConfig = {
  title: 'AndroidDagashi',
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
  links: [
    {
      name: 'twitter',
      url: 'https://twitter.com/AndroidDagashi',
      icon: 'ant-design:twitter-circle-filled',
    },
    {
      name: 'github',
      url: 'https://github.com/AndroidDagashi',
      icon: 'akar-icons:github-fill',
    },
    {
      name: 'mail',
      url: 'mailto:android-dagashi@googlegroups.com',
      icon: 'fluent:mail-16-filled',
    },
    {
      name: 'rss',
      url: 'http://feeds.feedburner.com/AndroidDagashi',
      icon: 'fluent:rss-24-filled',
    },
  ],
}
