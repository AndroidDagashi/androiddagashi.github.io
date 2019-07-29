/* eslint no-console: "off", no-undef: "off", @typescript-eslint/no-var-requires: "off" */
const fs = require('fs')
const { createApolloFetch } = require('apollo-fetch')
const config = require('./config')

const API_DIR = './static/api'

// query for index
const indexQuery = fs.readFileSync('./apollo/queries/getMilestoneDigests.gql', 'utf8')
// query for issue
const milestoneQuery = fs.readFileSync('./apollo/queries/getMilestoneByNumber.gql', 'utf8')
// query for checking rate limit
const rateLimitQuery = fs.readFileSync('./apollo/queries/getRateLimit.gql', 'utf8')

// setup apollo
const apolloFectch = createApolloFetch({ uri: config.api })
apolloFectch.use(({ options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }
  options.headers.authorization = `Bearer ${config.token}`

  next()
})

/**
 * create Android Dagashi issue page path from GitHub's milestone title
 * replace any spaces with '-'. You need to use `encodeURIComponent` if necessary.
 *
 * ex. `40 2018-11-04` -> `40-2018-11-04`
 *
 * @param {*} milestone target milestone object
 * @returns {string} path
 */
function createIssuePathFromMilestone (milestone) {
  return milestone.title.trim().replace(/\s/g, '-')
}

/**
 * generate json for issue
 * @param {number} milestoneNumber milestone number to fetch
 * @returns {Void} Void
 */
async function generateIssueJson (milestoneNumber) {
  const { data, errors } = await apolloFectch(
    {
      query: milestoneQuery,
      variables: {
        repoOwner: config.repoOwner,
        repoName: config.repoName,
        milestoneNumber,
        fetchIssuesPerMilestone: 50,
        fetchCommentsPerIssue: 10
      },
      operationName: 'getMilestoneByNumber'
    }
  )

  if (errors) {
    console.error(errors)
  } else {
    const milestone = data.repository.milestone
    if (milestone.issues.pageInfo.hasNextPage) {
      // TODO: fetch issues & comments recursively
    }
    fs.writeFileSync(
      `${API_DIR}/issue/${createIssuePathFromMilestone(milestone)}.json`,
      JSON.stringify(milestone, null, '  '),
      'utf8'
    )
  }
}

/**
 *
 * @param {string} cursor Next cursor or null
 * @param {string} fileName file name
 * @returns {Promise} Promise of GHDigest
 */
async function generatePagedIndexJson (cursor, fileName) {
  console.log(`fetchng milestones. page: ${fileName}`)
  const { data, errors } = await apolloFectch(
    {
      query: indexQuery,
      variables: {
        repoOwner: config.repoOwner,
        repoName: config.repoName,
        after: cursor
      },
      operationName: 'getMilestoneDigests'
    }
  )

  if (errors) {
    console.error('Failed to generate index.json', errors)
    return null
  } else {
    const repository = data.repository
    repository.milestones.nodes.forEach((milestone) => {
      milestone.path = createIssuePathFromMilestone(milestone)
    })
    fs.writeFileSync(
      `${API_DIR}/${fileName}.json`,
      JSON.stringify(repository, null, '  '),
      'utf8'
    )
    return repository
  }
}

/**
 * generate json file for index
 * @returns {object} repository
 */
async function generateIndexJson () {
  let fileName = 'index'
  let nextCursor = null
  let hasNext = true

  let wholeRepository = null

  // load milestones
  while (hasNext) {
    const repo = await generatePagedIndexJson(nextCursor, fileName)

    if (wholeRepository == null) {
      wholeRepository = repo
    } else {
      wholeRepository.milestones.nodes = wholeRepository.milestones.nodes.concat(repo.milestones.nodes)

      const pageInfo = repo.milestones.pageInfo
      wholeRepository.milestones.pageInfo.hasNextPage = pageInfo.hasNextPage
      wholeRepository.milestones.pageInfo.endCursor = pageInfo.endCursor
    }

    hasNext = repo.milestones.pageInfo.hasNextPage
    nextCursor = repo.milestones.pageInfo.endCursor
    fileName = repo.milestones.pageInfo.endCursor
  }

  wholeRepository.milestones.nodes.forEach((milestone) => {
    milestone.path = createIssuePathFromMilestone(milestone)
  })

  return wholeRepository
}

/**
 * get and report current rate limit information
 * @returns { Promise } Promise
 */
async function reportRateLimit () {
  const { data, errors } = await apolloFectch(
    {
      query: rateLimitQuery,
      operationName: 'getRateLimit'
    }
  )

  if (errors) {
    console.error('Failed to fetch Rate Limit', errors)
  } else {
    console.log('RateLimit:')
    console.log(data.rateLimit)
  }
}

/**
 * entry method.
 * generate all required json files.
 * @returns {Promise} Promise
 */
async function generateJsons () {
  try {
    // generate json for home
    const { milestones } = await generateIndexJson()

    // generate json for each issue
    for (let i = 0; i < milestones.nodes.length; i++) {
      console.log('fetching milestone:', milestones.nodes[i].number)
      await generateIssueJson(milestones.nodes[i].number)
    }
  } catch (e) {
    console.error('Failed to generate json', e)
  }
}

generateJsons()
  .then(() => reportRateLimit())
