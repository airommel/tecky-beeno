import { selectImage } from '@beenotung/tslib/file'
import { KB } from '@beenotung/tslib/size'
import { format_byte } from '@beenotung/tslib/format'
import {
  compressMobilePhoto,
  resizeBase64WithRatio,
  dataURItoBlob,
} from '@beenotung/tslib/image'
import { useState } from 'react'
import { ImageFile, UploadImageListResult } from 'shared'
import { upload } from '../api'
import { useArray } from '../hooks/use-array'
import { ErrorMessage } from './ErrorMessage'
import { useDispatch } from 'react-redux'
import { invalidImageListAction } from '../redux/image/action'
import { uploadImageListThunk } from '../redux/image/thunk'

type DraftImageItem = {
  file: File
  previewUrl: string
  id: number
}

export function UploadImage() {
  const draftImageList = useArray<DraftImageItem>()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const addPhoto = async () => {
    let files = await selectImage({ multiple: true })
    let id = draftImageList.reduce((id, item) => Math.max(id, item.id + 1), 1)
    for (let file of files) {
      let dataUrl = await compressMobilePhoto({
        image: file,
        maximumSize: 300 * KB,
      })
      dataUrl = await resizeBase64WithRatio(
        dataUrl,
        { width: 480, height: 680 },
        'with_in',
      )
      let blob = dataURItoBlob(dataUrl)
      file = new File([blob], file.name, {
        type: blob.type,
        lastModified: file.lastModified,
      })
      draftImageList.push({ id, file, previewUrl: dataUrl })
      id++
    }
  }
  const uploadAll = async () => {
    let fileList = draftImageList.map(item => item.file)
    let onResult = (maybeError: string | null) => {
      if (maybeError) {
        setError(maybeError)
      } else {
        setError('')
        draftImageList.reset()
      }
    }
    dispatch(uploadImageListThunk(fileList, onResult))
  }

  return (
    <div>
      <button onClick={addPhoto}>add photo</button>
      <button hidden={draftImageList.isEmpty()} onClick={uploadAll}>
        upload all
      </button>
      <h2>draft images:</h2>
      <div>
        {draftImageList.map(item => (
          <div key={item.id}>
            <img src={item.previewUrl} loading="lazy" />
            <div>
              {item.file.name} ({format_byte(item.file.size)})
              <button onClick={() => draftImageList.remove(item)}>
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button hidden={draftImageList.isEmpty()} onClick={uploadAll}>
        upload all
      </button>
      <ErrorMessage error={error} />
    </div>
  )
}
