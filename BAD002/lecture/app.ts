import express from 'express'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { client } from './db'

export let app = express()

app.use(express.json())

let userService = new UserService(client)
let userController = new UserController(userService)

app.use(userController.router)
