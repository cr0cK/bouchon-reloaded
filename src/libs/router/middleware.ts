import * as express from 'express'
import { newLogger } from '../logger'
import { EndPoint, Route } from '../types'

const logger = newLogger('Router')

/**
 * Register all routes of all endPoints.
 */
export function corkRouter(endpoints: EndPoint[]): express.Router {
  const router = express.Router()

  endpoints.forEach(endPoint => {
    endPoint.routes.forEach(route => {
      const routerMethodFn = getRouteMethodFn(router, route.method)

      logger.info(`Register ${route.method} ${route.pathname}`)

      routerMethodFn(route.pathname, (req, res, next) => {
        res.send('hey')
      })
    })
  })

  return router
}

/**
 * Return the router function according to the method.
 */
function getRouteMethodFn(
  router: express.Router,
  method: Route<any, any, any>['method']
): express.IRouterMatcher<any> {
  switch (method) {
    case 'GET':
      return router.get.bind(router)

    case 'POST':
      return router.post.bind(router)

    case 'PATCH':
      return router.patch.bind(router)

    case 'PUT':
      return router.put.bind(router)

    case 'DELETE':
      return router.delete.bind(router)

    case 'HEAD':
      return router.head.bind(router)
  }
}
