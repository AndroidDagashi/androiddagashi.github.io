import { readFile, writeFile } from 'site-common/file'
import { Feed } from 'feed'
import type { GHDigest } from 'site-types/GitHubApi'
import { siteConfig } from 'site-config'
import MarkdownIt from 'markdown-it'

async function generateRss(): Promise<void> {
  const rootUrl = `${siteConfig.baseUrl}/`
  const today = new Date()
  const digest = JSON.parse(
    await readFile('../site/public/api/index.json')
  ) as GHDigest
  const title = siteConfig.title

  // create feed xml root
  const feed = new Feed({
    title,
    description: siteConfig.description,
    id: rootUrl,
    link: rootUrl,
    favicon: `${rootUrl}favicon.ico`,
    copyright: `All rights reserved ${today.getUTCFullYear()}, ${title}`,
    updated: new Date(digest.milestones.nodes[0].closedAt),
    feedLinks: {
      atom: `${rootUrl}feed.xml`,
    },
    author: {
      name: title,
      link: rootUrl,
    },
  })

  const md = new MarkdownIt()

  // create feed items from milestones
  digest.milestones.nodes.forEach((milestone) => {
    const description = md.render(milestone.description)
    const url = `${rootUrl}issue/${milestone.path}`
    feed.addItem({
      title: `#${milestone.title}`,
      id: url,
      link: url,
      description,
      date: new Date(milestone.closedAt),
    })
  })

  feed.addCategory('Android')
  siteConfig.authors.forEach((author) => {
    feed.addContributor({
      name: `@${author.name}`,
      link: `https://twitter.com/${author.name}`,
    })
  })

  await writeFile('../site/public/feed.xml', feed.atom1())
}

generateRss()
  .then(() => 'finished')
  .catch((e) => console.log('failed to generate rss feed', e))
