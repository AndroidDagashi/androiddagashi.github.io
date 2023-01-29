import { rm, mkdirp } from 'site-common/file'
import { Config } from './src/config'
import path from 'path'
import TopDigestsGenerator from './src/generator/TopDigestsGenerator'
import IssueGenerator from './src/generator/IssueGenerator'
import { GitHubClient, GitHubConfig } from 'site-api-github'
import { chunk } from './src/utils'
import { siteConfig } from 'site-config'
import { rimraf } from 'rimraf'
import { copy } from 'fs-extra'
import { existsSync, readdirSync } from 'fs'

async function generateApi(): Promise<void> {
  const config = new Config(
    process.env.GH_READONLY_TOKEN || '',
    siteConfig.issueRepository.owner,
    siteConfig.issueRepository.name,
    path.normalize(`${__dirname}/../../.temp/api`),
    path.normalize(`${__dirname}/../site/static/api`)
  )

  if (existsSync(config.tempOutputDirs.root)) {
    await rm(config.tempOutputDirs.root, true)
  }

  const ghClient = await GitHubClient.init(
    new GitHubConfig(config.repoOwner, config.repoName, config.token)
  )
  // generate index.json
  await mkdirp(config.tempOutputDirs.root)
  const topGen = new TopDigestsGenerator(ghClient, config.tempOutputDirs)
  const milestoneNumbers = await topGen.generate()

  const latest10 = milestoneNumbers.slice(0, 10)
  // TODO: update other milestones depending on time?
  // const others = milestoneNumbers.slice(10)

  // generate issue json
  await mkdirp(config.tempOutputDirs.issues)
  const issueGen = new IssueGenerator(ghClient, config.tempOutputDirs)
  const chunkedMilestoneNumbers = chunk(latest10, 3)
  await Promise.all(
    chunkedMilestoneNumbers.map((numbers) => {
      return (async (): Promise<void> => {
        for (const milestoneNumber of numbers) {
          await issueGen.generate(milestoneNumber)
        }
      })()
    })
  )

  // remove files in outputDirs.root, but preserves files in issue directory
  const entries = readdirSync(config.outputDirs.root, { withFileTypes: true })
  const filesToDelete = entries
    .filter((v) => v.isFile() && v.name.endsWith('.json'))
    .map((v) => path.resolve(config.outputDirs.root, v.name))

  await rimraf(filesToDelete)
  await mkdirp(config.outputDirs.root)

  await copy(config.tempOutputDirs.root, config.outputDirs.root, {
    overwrite: true,
  })
}

generateApi()
  .then(() => console.log('finished'))
  .catch((error) => {
    console.error('failed to generate api jsons:', error)
    process.exit(1)
  })
