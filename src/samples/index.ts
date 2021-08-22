import { bouchonServer } from '../libs'
import { endPoint as articlesEndPoint } from './articles'
import { endPoint as usersEndPoint } from './users'

bouchonServer('0.0.0.0', 5000, [usersEndPoint, articlesEndPoint]).start()
