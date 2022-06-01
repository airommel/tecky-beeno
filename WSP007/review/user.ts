import { DataFile } from './data-file'

export type User = {
  username: string
  password: string
}

export let userDataFile = new DataFile<User[]>('user-list.json', [])
