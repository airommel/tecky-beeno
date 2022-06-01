import { LogService } from './log.service'
import { RestfulController } from './rest.controller'

export class LogController extends RestfulController {
  constructor(private logService: LogService) {
    super()
    this.router.get('/logs/recent', this.getRecentRoutes)
  }

  getRecentRoutes = this.handleRequest(async (req, res) => {
    let log_list = await this.logService.getRecentLogs()
    return { log_list }
  })
}
