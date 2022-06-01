import multer from 'multer'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import { env } from './env'

let s3 = new aws.S3({
  accessKeyId: env.aws.accessKeyId,
  secretAccessKey: env.aws.secretAccessKey,
  region: env.aws.s3Region,
})

let counter = 0
let s3Storage = multerS3({
  s3,
  bucket: env.aws.s3Bucket,
  metadata: (req, file, cb) => {
    console.log('s3 object metadata, file:', file)
    cb(null, { fieldName: file.fieldname })
  },
  key: (req, file, cb) => {
    console.log('s3 object key, file:', file)
    let now = Date.now()
    // image/jpeg or image/png
    let ext = file.mimetype.split('/').pop()
    counter++
    let key = `${file.fieldname}-${now}-${counter}.${ext}`
    cb(null, key)
  },
})

let fileStorage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    let now = Date.now()
    // image/jpeg or image/png
    let ext = file.mimetype.split('/').pop()
    counter++
    let filename = `${file.fieldname}-${now}-${counter}.${ext}`
    cb(null, filename)
  },
})

export let upload = multer({
  storage: env.nodeEnv === 'development' ? fileStorage : s3Storage,
})
