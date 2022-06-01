import { DataFile } from './data-file'

export type Memo = {
  content: string
  color?: string
  history: string[]
  photo?: string
}

export let memoDataFile = new DataFile<Memo[]>('memo-list.json', [])
