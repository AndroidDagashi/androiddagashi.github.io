import { Octokit } from '@octokit/rest'
import { siteConfig } from 'site-config'
import { parseISO, addDays, formatISO } from 'date-fns'

async function main(): Promise<string> {
  const octokit = new Octokit({
    auth: process.env.PUSH_ACCESS_TOKEN,
    timeZone: 'Asiz/Tokyo',
  })

  const milestones = await octokit.issues.listMilestones({
    owner: siteConfig.issueRepository.owner,
    repo: siteConfig.issueRepository.name,
    state: 'all',
    sort: 'due_on',
    direction: 'desc',
    per_page: 2,
    page: 1,
  })

  console.log(milestones)

  const latest = milestones.data[0]

  if (latest.state === 'open') {
    // milestone with 'open' state exists. nothing to do.
    return `open milestone(${latest.number}) still exists.`
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dueOn = parseISO(latest.due_on!)

  const nextMilestoneNumber = latest.number + 1
  const nextDueOn = addDays(dueOn, 7)

  const nextTitle = `${nextMilestoneNumber} ${formatISO(nextDueOn, {
    representation: 'date',
  })}`

  const result = await octokit.issues.createMilestone({
    owner: siteConfig.issueRepository.owner,
    repo: siteConfig.issueRepository.name,
    title: nextTitle,
    due_on: formatISO(nextDueOn),
  })

  return `${result.data.number}, ${result.data.title}, ${result.data.due_on}`
}

main()
  .then((result) => console.log('finished', result))
  .catch((e) => console.error(e))
