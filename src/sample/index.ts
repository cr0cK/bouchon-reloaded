import { startBouchon } from '../libs'
import { endPoint as articlesEndPoint } from './articles'
import { endPoint as usersEndPoint } from './users'

startBouchon('0.0.0.0', 5000, [usersEndPoint, articlesEndPoint])
