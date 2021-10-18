import { newLogger } from '@libs/logger'
import { bouchonRouter } from '../router'
import { EndPoint } from '@libs/types'
import * as express from 'express'
import { Server } from 'http'

const logger = newLogger('Bouchon')

/**
 * Start/close a Bouchon server.
 */
export function bouchonServer(
  host: string,
  port: number,
  endPoints: EndPoint[]
) {
  let server: Server

  return {
    /**
     * Start a simple server.
     */
    start(): Promise<Server> {
      return new Promise(resolve => {
        const app = express()

        app.use(bouchonRouter(endPoints))

        server = app.listen(port, () => {
          logger.info(`Start app at http://${host}:${port}`)

          resolve(server)
        })

        server.on('close', () => {
          logger.info('Closing Bouchon...')
        })
      })
    },

    /**
     * Return the server instance.
     */
    getServer(): Server {
      return server
    },

    /**
     * Return the server instance.
     */
    stop(): void {
      server.close()
    }
  }
}
