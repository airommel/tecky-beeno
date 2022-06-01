import { ImageAction } from './action'
import { ImageState } from './state'

const initialState: ImageState = {
  fileList: [],
  isFileListFresh: false,
}

export const imageReducer = (
  state: ImageState = initialState,
  action: ImageAction,
): ImageState => {
  switch (action.type) {
    case 'image.setFileList':
      return {
        fileList: action.fileList,
        isFileListFresh: true,
      }
    case 'image.invalid':
      return {
        ...state,
        isFileListFresh: false,
      }
    default: {
      let a: never = action
      String(a)
      return state
    }
  }
}
