import jsonfile from 'jsonfile'
import { Request, Response } from 'express'

export type Memo = {
  content: string
  color?: string
  history: string[]
  photo?: string
}

const memoListFile = 'memo-list.json'

async function loadMemoList(): Promise<Memo[]> {
  try {
    let memoList = await jsonfile.readFile(memoListFile)
    return memoList
  } catch (error) {
    return []
  }
}

let memoListPromise = loadMemoList()

export async function saveMemoList(memoList: Memo[]) {
  await jsonfile.writeFile(memoListFile, memoList)
}

export async function useMemoList(
  req: Request,
  res: Response,
  callback: (memoList: Memo[]) => void,
) {
  try {
    let memoList = await memoListPromise
    callback(memoList)
  } catch (error: any) {
    res.status(500).end(error.toString())
  }
}
