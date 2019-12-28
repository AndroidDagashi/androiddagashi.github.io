import fs from 'fs'
import yaml from 'js-yaml'
import serviceAccount from '../../../androiddagashi-serviceaccount.json'
import GitHubConfig from './github/GitHubConfig'
import TwitterConfig from './twitter/TwitterConfig'

const siteConfig = yaml.safeLoad(fs.readFileSync('../../siteconfig.yml', 'utf8'))

export default {
  firebaseServiceAccount: serviceAccount,
  twitterConfig: new TwitterConfig(
    process.env.TWITTER_API_KEY as string,
    process.env.TWITTER_API_KEY_SECRET as string,
    process.env.TWITTER_ACCESS_TOKEN as string,
    process.env.TWITTER_ACCESS_TOKEN_SECRET as string
  ),
  gitHubConfig: new GitHubConfig(
    siteConfig.issueRepository.name,
    siteConfig.issueRepository.owner,
    process.env.GH_READONLY_TOKEN as string
  )
}
