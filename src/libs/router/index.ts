import * as express from 'express'
import { isDefined } from '../helpers'
import { newLogger } from '../logger'
import { Action, EndPoint, Route } from '../types'
import { getDefaultResponseStatusCode } from './helpers'

const logger = newLogger('Router')

/**
 * Register all routes of all endPoints.
 */
export function bouchonRouter(endpoints: EndPoint[]): express.Router {
  const router = express.Router()

  router.use(express.json())

  router.use(
    express.urlencoded({
      extended: true
    })
  )

  endpoints.forEach(endPoint => {
    endPoint.routes.forEach(route => {
      const routerMethodFn = getRouteMethodFn(router, route.method)
      const pathname = [endPoint.pathname, route.pathname]
        .filter(isDefined)
        .join('/')
        .replace(/\/+/g, '/')

      logger.info(`Register ${route.method} ${pathname}`)

      routerMethodFn(pathname, handleRoute(route))
    })
  })

  return router
}

/**
 * Handle the route response.
 */
function handleRoute(route: Route<any, any, any>) {
  return (req: express.Request, res: express.Response): void => {
    const action: Action = {
      name: route.action.name,
      parameters: castRouteParameters(req.params),
      bodyParameters: req.body,
      headerParameters: req.headers
    }

    dispatchRouteAction(route, action)(req, res)

    const selectedData = selectRouteData(route, action)(req, res)
    handleRouteResponse(route, action, selectedData)(req, res)
  }
}

/**
 * Dispatch the route action with request parameters.
 */
function dispatchRouteAction(route: Route<any, any, any>, action: Action) {
  return (req: express.Request, res: express.Response): void => {
    logger.debug(`Dispatching "${route.action.name}"`)
    route.action(action)
  }
}

/**
 * Select route data by calling the action selector function.
 */
function selectRouteData(route: Route<any, any, any>, action: Action) {
  return (req: express.Request, res: express.Response): any => {
    logger.debug(`Selecting data for action "${route.action.name}"`)
    return route.selector(action)
  }
}

/**
 * Return the data via response object.
 */
function handleRouteResponse(
  route: Route<any, any, any>,
  action: Action,
  selectedData: any
) {
  return (req: express.Request, res: express.Response) => {
    // call custom handler if defined
    if (route.handler) {
      route.handler(selectedData)(req, res)
      return
    }

    const status = getDefaultResponseStatusCode(selectedData)(req, res)
    res.status(status).send(selectedData)
  }
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

/**
 * Cast route parameters that look like as numbers as numbers.
 */
function castRouteParameters<T>(parameters: T): T {
  return Object.entries(parameters).reduce((acc, [key, value]) => {
    if (!isDefined(value)) {
      return acc
    }

    const isDigit = /^[0-9]+$/.test(value)

    return {
      ...acc,
      [key]: isDigit ? Number(value) : value
    }
  }, {} as T)
}
