import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'fs'
import { UX } from '@salesforce/command'
import { IdMap } from '../types/common.types'

export const readIdMap = (path: string, ux?: UX): IdMap => {
  let idmap: IdMap

  try {
    const content = readFileSync(path)
    idmap = JSON.parse(content.toString()) as IdMap
  } catch (err) {
    ux?.log(`Failed to load ID-Map file: ${path} will create new file at the end`)
    idmap = {}
  }

  return idmap
}

export const reverseId = (originalId: string, idmap: IdMap): string => {
  return idmap[originalId] ?? originalId
}

export const readFileSafe = (path: string, ux?: UX): string => {
  try {
    const raw = readFileSync(path)
    return raw.toString()
  } catch (err) {
    ux?.log(`Failed to read file: ${path}`)
    return ''
  }
}

export const writeFileSafe = (dir: string, filename: string, data: string): void => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(`${dir}/${filename}`, data)
}

export const getDirectoryNames = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return []
  }

  const result = readdirSync(dir, { withFileTypes: true })
  return result.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
}

export const getFileNames = (dir: string): string[] => {
  if (!existsSync(dir)) {
    return []
  }

  const result = readdirSync(dir, { withFileTypes: true })
  return result.filter(dirent => dirent.isFile()).map(dirent => dirent.name)
}
