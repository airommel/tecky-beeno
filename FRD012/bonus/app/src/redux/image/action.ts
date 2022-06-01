import { ImageFile } from 'shared'

export function setImageListAction(fileList: ImageFile[]) {
  return {
    type: 'image.setFileList' as const,
    fileList,
  }
}

export function invalidImageListAction() {
  return { type: 'image.invalid' as const }
}

export type ImageAction =
  | ReturnType<typeof setImageListAction>
  | ReturnType<typeof invalidImageListAction>
