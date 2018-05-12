const fs = require('fs');
const yaml = require('js-yaml');
const Feed = require('feed');
const MarkdownIt = require('markdown-it');

const siteConfig = yaml.safeLoad(fs.readFileSync('./siteconfig.yml', 'utf8'));

/**
 * generate rss feed xml
 * @returns {Void} Void
 */
function create() {
  let rootUrl = `${siteConfig.baseUrl}/`;
  const today = new Date();
  const digest = JSON.parse(fs.readFileSync('./static/api/index.json', 'utf8'));

  // create feed xml root
  let feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: rootUrl,
    link: rootUrl,
    favicon: `${rootUrl}favicon.ico`,
    copyright: `All rights reserved ${today.getUTCFullYear()}, ${siteConfig.title}`,
    updated: new Date(digest.milestones.nodes[0].closedAt),
    feedLinks: {
      atom: `${rootUrl}feed.xml`
    },
    author: {
      name: siteConfig.title,
      link: rootUrl
    }
  });

  const md = new MarkdownIt();

  // create feeed items from milestones
  digest.milestones.nodes.forEach(milestone => {
    var descriptions = [];
    milestone.issues.nodes.forEach(issue => {
      descriptions.push(issue.title);
    });
    var description = md.render(milestone.description) + descriptions.join('/');
    var url = `${rootUrl}issue/${milestone.title}`;
    feed.addItem({
      title: milestone.title,
      id: url,
      link: url,
      description,
      date: new Date(milestone.closedAt)
    });
  });

  feed.addCategory('Android');

  siteConfig.authors.forEach(author => {
    feed.addContributor({
      name: author.name,
      link: author.link
    });
  });

  fs.writeFileSync(
    './static/feed.xml',
    feed.atom1(),
    'utf8'
  );
}


create();
