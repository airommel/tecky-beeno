import { Application } from 'express'
import { DataFile } from './data-file'
import { upload } from './upload'

export type User = {
  username: string
  password: string
  photo?: string
}

export let userDataFile = new DataFile<User[]>('user-list.json', [])

export function attachUserRoutes(app: Application) {
  app.post('/user', upload.single('photo'), (req, res) => {
    userDataFile.useData(req, res, userList => {
      // let username = req.body.username
      let { username, password } = req.body
      if (!username) {
        res.status(400).json({ message: 'Missing username' })
        return
      }
      if (!password) {
        res.status(400).json({ message: 'Missing password' })
        return
      }
      // let photo = req.file ? req.file.filename : undefined
      let photo = req.file?.filename

      if (userList.find(user => user.username == username)) {
        res
          .status(400)
          .json({ message: 'The email is already used by another account' })
        return
      }

      userList.push({
        username,
        password,
        photo,
      })
      userDataFile.saveData(userList)
      res.json({ message: 'created account' })
    })
  })
  app.get('/user/count', (req, res) => {
    userDataFile.useData(req, res, userList => {
      res.json({ count: userList.length })
    })
  })
}
