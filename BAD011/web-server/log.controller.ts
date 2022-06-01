import { LogService } from './log.service'
import { RestfulController } from './rest.controller'

export class LogController extends RestfulController {
  constructor(private logService: LogService) {
    super()
    this.router.get('/logs/recent', this.getRecentRoutes)
    this.router.get('/logs/stats', this.getStats)
  }

  getRecentRoutes = this.handleRequest(async (req, res) => {
    let log_list = await this.logService.getRecentLogs()
    return { log_list }
  })

  getStats = this.handleRequest(async (req, res) => {
    let data = await this.logService.getStats()
    return data
  })
}
