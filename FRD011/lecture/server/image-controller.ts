import express from 'express'
import { Multer } from 'multer'
import { ImageService } from './image-service'
import './express'
import { wrapControllerMethod } from './express-adapter'
import { HttpError } from './http-error'

export class ImageController {
  router = express.Router()

  constructor(private upload: Multer, private imageService: ImageService) {
    this.router.post(
      '/image/single',
      this.upload.single('photo'),
      wrapControllerMethod(this.uploadImage),
    )
    this.router.post(
      '/image/multiple',
      this.upload.array('photo'),
      wrapControllerMethod(this.uploadImageList),
    )
    this.router.get('/image', wrapControllerMethod(this.getImageList))
  }

  uploadImage = async (req: express.Request) => {
    let file = req.file
    if (!file) {
      throw new HttpError('missing photo in request body', 400)
    }
    let filename = file.key || file.filename
    let id = await this.imageService.storeImage(filename)
    return { id }
  }

  uploadImageList = async (req: express.Request) => {
    let files = req.files
    if (!Array.isArray(files)) {
      throw new HttpError('missing photo in request body', 400)
    }
    let nameList = files.map(file => file.key || file.filename)
    let idList = await this.imageService.storeImageList(nameList)
    return {
      fileList: idList.map((id, i) => ({ id, filename: nameList[i] })),
    }
  }

  getImageList = async (req: express.Request) => {
    let imageList = await this.imageService.getImageList()
    return { imageList }
  }
}
