import { logService } from './services'
import express from 'express'
import { LogController } from './log.controller'
import { UserController } from './user.controller'

export let apiRoutes = express.Router()

let userController = new UserController()
apiRoutes.use(userController.router)

let logController = new LogController(logService)
apiRoutes.use(logController.router)
