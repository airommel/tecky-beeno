import { KB } from '@beenotung/tslib/size'
import { selectImage } from '@beenotung/tslib/file'
import { format_byte } from '@beenotung/tslib/format'
import {
  compressMobilePhoto,
  dataURItoBlob,
  resizeBase64WithRatio,
} from '@beenotung/tslib/image'
import { useEffect, useState } from 'react'
import { get, toImageUrl, upload } from './api'
import './App.css'
import { useArray } from './hooks/use-array'

type DraftImageItem = {
  file: File
  previewUrl: string
  id: number
}

type PublicImageItem = {
  id: number
  filename: string
}

function App() {
  const draftImageList = useArray<DraftImageItem>()
  const publicImageList = useArray<PublicImageItem>()
  const [error, setError] = useState('')

  const setPublicImageList = publicImageList.replace
  useEffect(() => {
    get('/image').then(result => {
      setError(result.error)
      setPublicImageList(result.imageList || [])
    })
  }, [])

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
        { width: 128, height: 128 },
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
    let formData = new FormData()
    draftImageList.forEach(item => formData.append('photo', item.file))
    let result = await upload('/image/multiple', formData)
    setError(result.error || '')
    if (result.fileList) {
      draftImageList.reset()
      for (let file of result.fileList) {
        publicImageList.push(file)
      }
    }
  }
  return (
    <div className="App">
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
      {error ? <p>Failed to upload photos: {error}</p> : null}
      <h2>public images:</h2>
      {publicImageList.map(item => (
        <img key={item.id} src={toImageUrl(item.filename)} loading="lazy" />
      ))}
    </div>
  )
}

export default App
