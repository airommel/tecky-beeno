import { GetImageListResult, UploadImageListResult } from 'shared'
import { get, upload } from '../../api'
import { AppDispatch } from '../action'
import { invalidImageListAction, setImageListAction } from './action'

export function getImageListThunk(setError: (error: string) => void) {
  return (dispatch: AppDispatch) => {
    get<GetImageListResult>('/image').then(result => {
      if ('error' in result) {
        setError(result.error)
      } else {
        setError('')
        dispatch(setImageListAction(result.fileList))
      }
    })
  }
}

export function uploadImageListThunk(
  fileList: File[],
  onResult: (error: string | null) => void,
) {
  return async (dispatch: AppDispatch) => {
    let formData = new FormData()
    fileList.forEach(file => formData.append('photo', file))
    let result = await upload<UploadImageListResult>(
      '/image/multiple',
      formData,
    )
    if ('error' in result) {
      onResult(result.error)
    } else {
      onResult(null)
      dispatch(invalidImageListAction())
    }
  }
}
