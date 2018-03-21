module.exports = {
  api: 'https://api.github.com/graphql',
  token: process.env.GH_READONLY_TOKEN,
  repoOwner: process.env.GH_REPO_OWNER,
  repoName: process.env.GH_REPO_NAME,
  outputDir: '../../assets/api'
}
