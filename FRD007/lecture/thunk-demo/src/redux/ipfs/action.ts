import { IPFSContent } from './state'

export function setIPFSContentAction(hash: string, content: IPFSContent) {
  return {
    type: '@@IPFS/setContent' as const,
    hash,
    content,
  }
}

export type IPFSActionType = ReturnType<typeof setIPFSContentAction>
