import { GHDigestMilestone } from 'site-types/GitHubApi'

export interface MilestoneMeta {
  title: string
  url: string
  number: number
  description: string
}

export function createMilestoneMeta(
  milestone: GHDigestMilestone
): MilestoneMeta {
  return {
    title: milestone.title,
    url: generateMilestoneUrl(milestone),
    number: milestone.number,
    description: milestone.description,
  }
}

function generateMilestoneUrl(milestone: GHDigestMilestone): string {
  const milestonePath = milestone.title.trim().replace(/\s/g, '-')
  return `https://androiddagashi.github.io/issue/${milestonePath}`
}

export function generateTweetMessage(meta: MilestoneMeta): string {
  return (
    `一週間の #AndroidDev 開発関連ニュースをお届けする #AndroidDagashi、第${meta.number}回を公開しました！ #Androidjp \n\n` +
    `${meta.description}\n\n` +
    meta.url
  )
}

export function generateBlueskyMessage(meta: MilestoneMeta): string {
  return (
    `一週間の Android 開発関連ニュースをお届けする AndroidDagashi、第${meta.number}回を公開しました！ \n\n` +
    `${meta.description}\n\n` +
    meta.url
  )
}
