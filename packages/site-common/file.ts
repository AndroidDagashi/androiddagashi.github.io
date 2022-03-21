import fs from 'fs'
import { promisify } from 'util'

export async function mkdirp(path: fs.PathLike): Promise<void> {
  await promisify(fs.mkdir)(path, { recursive: true })
}

export async function rm(
  path: fs.PathLike,
  recursive: boolean
): Promise<void> {
  await promisify(fs.rm)(path, { recursive })
}

export async function readFile(path: fs.PathLike): Promise<string> {
  return await promisify(fs.readFile)(path, { encoding: 'utf8' })
}

export async function writeFile(
  path: fs.PathLike,
  data: string
): Promise<void> {
  await promisify(fs.writeFile)(path, data)
}

export async function rename(
  oldPath: fs.PathLike,
  newPath: fs.PathLike
): Promise<void> {
  return await promisify(fs.rename)(oldPath, newPath)
}
