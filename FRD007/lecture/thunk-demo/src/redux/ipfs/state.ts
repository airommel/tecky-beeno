export type IPFSState = {
  // hash -> content
  records: Record<string, IPFSContent>
}

export type IPFSContent =
  | {
      type: 'text'
      text: string
    }
  | {
      type: 'object'
      value: any
    }
  | {
      type: 'error'
      error: string
    }
