import { bouchon } from '../libs'
import { endPoint as articlesEndPoint } from './articles'
import { endPoint as usersEndPoint } from './users'

bouchon('0.0.0.0', 5000, [usersEndPoint, articlesEndPoint])
