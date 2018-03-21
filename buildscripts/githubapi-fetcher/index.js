const config = require('./config');
const fs = require('fs');
const { createApolloFetch } = require('apollo-fetch');


// query for index
const indexQuery = fs.readFileSync('./apollo/queries/getMilestoneDigests.gql', 'utf8');
// query for issue
const milestoneQuery = fs.readFileSync('./apollo/queries/getMilestoneByNumber.gql', 'utf8');

// setup apollo
const apolloFectch = createApolloFetch({ uri: config.api });
apolloFectch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers['authorization'] = `Bearer ${config.token}`;

  next();
});

async function generateJsons() {
  try {
    // generate json for home
    var { milestones } = await generateIndexJson();
    console.log(milestones)

    // generate json for each issue
    for (var i = 0; i < milestones.nodes.length; i++){
      console.log(milestones.nodes[i].number)
      var milestone = await generateIssueJson(milestones.nodes[i].number)
      console.log(milestone)
    }

  } catch (e) {
    console.error('Failed to generate json', e)
    return null;
  }
}

async function generateIndexJson() {
  var { data } = await apolloFectch(
    {
      query: indexQuery,
      variables: {
        repoOwner: config.repoOwner,
        repoName: config.repoName
      },
      operationName: 'getMilestoneDigests'
    }
  )
  fs.writeFileSync(
    './static/api/index.json',
    JSON.stringify(data.repository, null, '  '),
    'utf8'
  );
  return data.repository
}

// generate json for issue
async function generateIssueJson(milestoneNumber) {
  var { data, errors }  = await apolloFectch(
    {
      query: milestoneQuery,
      variables: {
        repoOwner: config.repoOwner,
        repoName: config.repoName,
        milestoneNumber: milestoneNumber,
        fetchIssuesPerMilestone: 50,
        fetchCommentsPerIssue: 10
      },
      operationName: 'getMilestoneByNumber'
    }
  )

  if (errors) {
    console.error(errors)
  } else {
    fs.writeFileSync(
      `./static/api/issue/${data.repository.milestone.id}.json`,
      JSON.stringify(data.repository.milestone, null, '  '),
      'utf8'
    )
  }
  console.log(data)
}


generateJsons();

