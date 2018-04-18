const fs = require('fs');
const Feed = require('feed');

function create() {
  let rootUrl = 'https://androiddagashi.github.io/';
  const today = new Date();
  const digest = JSON.parse(fs.readFileSync('./static/api/index.json', 'utf8'));

  // create feed xml root
  let feed = new Feed({
    title: 'Android Dagashi',
    description: 'Weekly Android developer news digest in Japanese',
    id: rootUrl,
    link: rootUrl,
    favicon: `${rootUrl}favicon.ico`,
    copyright: `All rights reserved ${today.getUTCFullYear()}, Android Dagashi`,
    updated: new Date(digest.milestones.nodes[0].closedAt),
    feedLinks: {
      atom: `${rootUrl}feed.xml`
    },
    author: {
      name: 'AndroidDagashi',
      link: rootUrl
    }
  })


  // create feeed items from milestones
  digest.milestones.nodes.forEach(milestone => {
    var descriptions = [];
    milestone.issues.nodes.forEach(issue => {
      descriptions.push(issue.title);
    })
    var description = descriptions.join('/');
    var url = `${rootUrl}issue/${milestone.title}`;
    feed.addItem({
      title: milestone.title,
      id: url,
      link: url,
      description,
      date: new Date(milestone.closedAt)
    });
  })

  feed.addCategory('Android')

  feed.addContributor({
    name: '_yshrsmz',
    link: 'https://twitter.com/_yshrsmz'
  });
  feed.addContributor({
    name: 'hydrakecat',
    link: 'https://twitter.com/hydrakecat'
  });

  fs.writeFileSync(
    './static/feed.xml',
    feed.atom1(),
    'utf8'
  )
}


create();
