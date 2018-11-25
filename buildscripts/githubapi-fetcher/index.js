/* eslint no-console: "off", typescript/no-var-requires: "off" */
const config = require('./config');
const fs = require('fs');
const { createApolloFetch } = require('apollo-fetch');

// query for index
const indexQuery = fs.readFileSync('./apollo/queries/getMilestoneDigests.gql', 'utf8');
// query for issue
const milestoneQuery = fs.readFileSync('./apollo/queries/getMilestoneByNumber.gql', 'utf8');
// query for checking rate limit
const rateLimitQuery = fs.readFileSync('./apollo/queries/getRateLimit.gql', 'utf8');

// setup apollo
const apolloFectch = createApolloFetch({ uri: config.api });
apolloFectch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers['authorization'] = `Bearer ${config.token}`;

  next();
});

/**
 * create Android Dagashi issue page path from GitHub's milestone title
 * replace any spaces with '-'. You need to use `encodeURIComponent` if necessary.
 *
 * ex. `40 2018-11-04` -> `40-2018-11-04`
 *
 * @param {*} milestone target milestone object
 * @returns {string} path
 */
function createIssuePathFromMilestone(milestone) {
  return milestone.title.trim().replace(/\s/g, '-');
}

/**
 * generate json for issue
 * @param {number} milestoneNumber milestone number to fetch
 * @returns {Void} Void
 */
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
  );

  if (errors) {
    console.error(errors);
  } else {
    let milestone = data.repository.milestone;
    if (milestone.issues.pageInfo.hasNextPage) {
      // TODO: fetch issues & comments recursively
    }
    fs.writeFileSync(
      `./static/api/issue/${createIssuePathFromMilestone(milestone)}.json`,
      JSON.stringify(milestone, null, '  '),
      'utf8'
    );
  }
}

async function generatePagedIndexJson(cursor, pageNo) {
  console.log(`fetchng milestones. page: ${pageNo}`);
  var { data, errors } = await apolloFectch(
    {
      query: indexQuery,
      variables: {
        repoOwner: config.repoOwner,
        repoName: config.repoName,
        after: cursor
      },
      operationName: 'getMilestoneDigests'
    }
  );

  if (errors) {
    console.error('Failed to generate index.json', errors);
    return null;
  } else {
    let repository = data.repository;
    repository.milestones.nodes.forEach(milestone => {
      milestone.path = createIssuePathFromMilestone(milestone);
    });
    if (repository.milestones.pageInfo.hasNextPage) {
      repository.milestones.pageInfo.nextPage = pageNo + 1;
    }
    fs.writeFileSync(
      `./static/api/${pageNo}.json`,
      JSON.stringify(repository, null, '  '),
      'utf8'
    );
    return repository;
  }
}

/**
 * generate json file for index
 * @returns {object} repository
 */
async function generateIndexJson() {
  let pageNo = 0;

  // load first page
  let wholeRepository = await generatePagedIndexJson(null, pageNo);

  let hasNext = wholeRepository.milestones.pageInfo.hasNextPage;
  let nextCursor = wholeRepository.milestones.pageInfo.endCursor;

  // load next pages
  while (hasNext) {
    pageNo++;

    let repo = await generatePagedIndexJson(nextCursor, pageNo);

    wholeRepository.milestones.nodes = wholeRepository.milestones.nodes.concat(repo.milestones.nodes);

    hasNext = repo.milestones.pageInfo.hasNextPage;
    nextCursor = repo.milestones.pageInfo.endCursor;
  }

  wholeRepository.milestones.nodes.forEach(milestone => {
    milestone.path = createIssuePathFromMilestone(milestone);
  });

  return wholeRepository;
}

/**
 * get and report current rate limit information
 * @returns { Promise } Promise
 */
async function reportRateLimit() {
  var { data, errors } = await apolloFectch(
    {
      query: rateLimitQuery,
      operationName: 'getRateLimit'
    }
  );

  if (errors) {
    console.error('Failed to fetch Rate Limit', errors);
  } else {
    console.log('RateLimit:');
    console.log(data.rateLimit);
  }
}

/**
 * entry method.
 * generate all required json files.
 * @returns {Promise} Promise
 */
async function generateJsons() {
  try {
    // generate json for home
    var { milestones } = await generateIndexJson();

    // generate json for each issue
    for (var i = 0; i < milestones.nodes.length; i++) {
      console.log('fetching milestone:', milestones.nodes[i].number);
      var milestone = await generateIssueJson(milestones.nodes[i].number);
    }
  } catch (e) {
    console.error('Failed to generate json', e);
  }
}


generateJsons()
  .then(() => reportRateLimit());
