export default interface Milestone {
  title: string
  number: number
  tweetUrl?: string
  // When the tweet was posted. The name predates Bluesky support.
  createdAt?: string
  blueskyUri?: string
  blueskyPostedAt?: string
}
