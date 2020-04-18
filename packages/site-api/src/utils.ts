import { GHMilestone, GHDigestMilestone } from 'site-types/GitHubApi'

/**
 * create Android Dagashi issue page path from GitHub's milestone title
 * replace any spaces with '-'. You need to use `encodeURIComponent` if necessary.
 *
 * ex. `40 2018-11-04` -> `40-2018-11-04`
 *
 * @param {*} milestone target milestone object
 * @returns {string} path
 */
export function normalizeIssuePath(
  milestone: GHMilestone | GHDigestMilestone
): string {
  return milestone.title.trim().replace(/\s/g, '-')
}

/**
 * Split provided array into chunks
 *
 * @see https://stackoverflow.com/questions/8495687/split-array-into-chunks
 * @param array
 * @param size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size))
    return acc
  }, [] as T[][])
}
