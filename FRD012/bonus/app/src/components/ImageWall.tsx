import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toImageUrl } from '../api'
import { getImageListThunk } from '../redux/image/thunk'
import { RootState } from '../redux/state'
import { ErrorMessage } from './ErrorMessage'

export function ImageWall() {
  const publicImageList = useSelector(
    (state: RootState) => state.image.fileList,
  )
  const isFileListFresh = useSelector(
    (state: RootState) => state.image.isFileListFresh,
  )
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  useEffect(() => {
    if (isFileListFresh) return
    dispatch(getImageListThunk(setError))
    // getImageListThunk(setError, dispatch)
    // getImageListThunk(setError)(dispatch)
  }, [isFileListFresh])

  return (
    <div>
      <h2>public images:</h2>
      <ErrorMessage error={error} />
      {publicImageList.map(item => (
        <img key={item.id} src={toImageUrl(item.filename)} loading="lazy" />
      ))}
    </div>
  )
}
