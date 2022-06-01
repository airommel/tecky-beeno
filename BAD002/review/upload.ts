import multer from 'multer'

let fileCounter = 0

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    fileCounter++
    let timestamp = Date.now()
    let ext: string = file.mimetype.split('/').pop()!
    ext = ext.split('-').pop()!
    ext = ext.split(';')[0]
    if (ext != 'jpeg') {
      cb(new Error('Invalid photo'), null as any)
      req.res?.status(400).end('Invalid photo, only allow jpeg format')
    } else {
      cb(null, `${file.fieldname}-${timestamp}-${fileCounter}.${ext}`)
    }
  },
})

export let upload = multer({ storage })
