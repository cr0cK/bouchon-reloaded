// import * as express from 'express'
// import { newLogger } from './logger'
// import { bouchonRouter } from './router'
// import { EndPoint } from './types'

// const logger = newLogger('Bouchon')

// export function startBouchon(
//   host: string,
//   port: number,
//   endPoints: EndPoint[]
// ) {
//   const app = express()

//   app.use(bouchonRouter(endPoints))

//   app.listen(port, () => {
//     logger.info(`Start app at http://${host}:${port}`)
//   })
// }
