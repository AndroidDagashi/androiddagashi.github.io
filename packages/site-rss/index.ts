import { readFile, writeFile } from 'site-common/file'
import yaml from 'js-yaml'
import { Feed } from 'feed'
import { GHDigest } from 'site-types/GitHubApi'
import { SiteConfig } from 'site-types/SiteConfig'
import MarkdownIt from 'markdown-it'

async function generateRss(): Promise<void> {
  const config = yaml.safeLoad(
    await readFile('../../siteconfig.yml')
  ) as SiteConfig

  const rootUrl = `${config.baseUrl}/`
  const today = new Date()
  const digest = JSON.parse(
    await readFile('../site/static/api/index.json')
  ) as GHDigest

  // create feed xml root
  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: rootUrl,
    link: rootUrl,
    favicon: `${rootUrl}favicon.ico`,
    copyright: `All rights reserved ${today.getUTCFullYear()}, ${config.title}`,
    updated: new Date(digest.milestones.nodes[0].closedAt),
    feedLinks: {
      atom: `${rootUrl}feed.xml`,
    },
    author: {
      name: config.title,
      link: rootUrl,
    },
  })

  const md = new MarkdownIt()

  // create feed items from milestones
  digest.milestones.nodes.forEach((milestone) => {
    const descriptions = milestone.issues.nodes.map((issue) => issue.title)
    const description =
      md.render(milestone.description) + descriptions.join('/')
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
  config.authors.forEach((author) => {
    feed.addContributor({
      name: author.name,
      link: author.link,
    })
  })

  await writeFile('../site/static/feed.xml', feed.atom1())
}

generateRss()
  .then(() => 'finished')
  .catch((e) => console.log('failed to generate rss feed', e))
