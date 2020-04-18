export default {
  api: 'https://api.github.com/graphql',
  token: process.env.GH_READONLY_TOKEN,
  repoOwner: '',
  repoName: '',
  outputDir: '../../assets/api',
}

export class OutputDirs {
  readonly root: string
  readonly issues: string

  constructor(rootDir: string) {
    this.root = rootDir
    this.issues = `${rootDir}/issue`
  }
}

export class Config {
  readonly api: string = 'https://api.github.com/graphql'
  readonly token: string
  readonly repoOwner: string
  readonly repoName: string
  readonly tempOutputDirs: OutputDirs
  readonly outputDirs: OutputDirs

  constructor(
    token: string,
    repoOwner: string,
    repoName: string,
    tempOutputDir: string,
    outputDir: string
  ) {
    this.token = token
    this.repoOwner = repoOwner
    this.repoName = repoName
    this.tempOutputDirs = new OutputDirs(tempOutputDir)
    this.outputDirs = new OutputDirs(outputDir)
  }
}
