import * as express from 'express'
import { isDefined } from '../helpers'

/**
 * Return the default status code according to the method and selected data.
 */
export function getDefaultResponseStatusCode(selectedData: any) {
  return (req: express.Request, res: express.Response) => {
    if (req.method === 'GET' && !isDefined(selectedData)) {
      return 404
    }

    if (req.method === 'DELETE' && !isDefined(selectedData)) {
      return 204
    }

    if (req.method === 'POST') {
      return 201
    }

    return 200
  }
}
