/* eslint @typescript-eslint/no-var-requires: "off", no-undef: "off" */
const fs = require('fs')
const yaml = require('js-yaml')

const siteConfig = yaml.safeLoad(fs.readFileSync('./siteconfig.yml', 'utf8'))

module.exports = {
  api: 'https://api.github.com/graphql',
  token: process.env.GH_READONLY_TOKEN,
  repoOwner: siteConfig.issueRepository.owner,
  repoName: siteConfig.issueRepository.name,
  outputDir: '../../assets/api'
}
