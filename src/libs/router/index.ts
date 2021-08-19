import { EndPoint } from '../types'
import * as express from 'express'
import { corkRouter } from './middleware'

export function startCork(host: string, port: number, endPoints: EndPoint[]) {
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use(corkRouter(endPoints))

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
