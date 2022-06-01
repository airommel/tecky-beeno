import {
  getSpyRoutes,
  groupRoutesByPath,
  spyRoutes,
} from 'collect-express-routes'
import express from 'express'

let mode = 'debug'
mode = 'dev'

export let app = express()
if (mode == 'debug') {
  spyRoutes(app)
}

export function printRoutes() {
  if (mode != 'debug') {
    console.info('printRoutes only works in debug mode')
  }
  let groups = groupRoutesByPath(getSpyRoutes(app))
  for (let url in groups) {
    let methods = groups[url].map(method => method.toUpperCase())
    for (let method of methods) {
      console.log(method, '\t', url)
    }
    // console.log(url, methods)
  }
}
