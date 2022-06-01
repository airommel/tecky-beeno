import { knex } from './db'
import { ImageService } from './image-service'
import { LogService } from './log-service'

export let logService = new LogService(knex)
export let imageService = new ImageService(knex)
