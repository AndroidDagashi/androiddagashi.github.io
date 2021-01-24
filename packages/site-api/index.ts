import { rmdir, mkdirp, rename } from 'site-common/file'
import { Config } from './src/config'
import path from 'path'
import TopDigestsGenerator from './src/generator/TopDigestsGenerator'
import IssueGenerator from './src/generator/IssueGenerator'
import { GitHubClient, GitHubConfig } from 'site-api-github'
import { chunk } from './src/utils'
import { siteConfig } from 'site-config'

async function generateApi(): Promise<void> {
  const config = new Config(
    process.env.GH_READONLY_TOKEN || '',
    siteConfig.issueRepository.owner,
    siteConfig.issueRepository.name,
    path.normalize(`${__dirname}/../../.temp/api`),
    path.normalize(`${__dirname}/../site/static/api`)
  )

  await rmdir(config.tempOutputDirs.root)

  const ghClient = await GitHubClient.init(
    new GitHubConfig(config.repoOwner, config.repoName, config.token)
  )
  // generate index.json
  await mkdirp(config.tempOutputDirs.root)
  const topGen = new TopDigestsGenerator(ghClient, config.tempOutputDirs)
  const milestoneNumbers = await topGen.generate()

  // generate issue json
  await mkdirp(config.tempOutputDirs.issues)
  const issueGen = new IssueGenerator(ghClient, config.tempOutputDirs)
  const chunkedMilestoneNumbers = chunk(milestoneNumbers, 3)
  await Promise.all(
    chunkedMilestoneNumbers.map((numbers) => {
      return (async (): Promise<void> => {
        for (const milestoneNumber of numbers) {
          await issueGen.generate(milestoneNumber)
        }
      })()
    })
  )

  await rmdir(config.outputDirs.root)
  await mkdirp(config.outputDirs.root)
  await rename(config.tempOutputDirs.root, config.outputDirs.root)
}

generateApi()
  .then(() => console.log('finished'))
  .catch((error) => console.error('failed to generate api jsons:', error))
