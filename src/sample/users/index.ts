import * as path from 'path'
import { createBouchon } from '../../libs/bouchon'
import { parseData } from '../../libs/bouchon/helpers'
import { getDefaultResponseStatusCode } from '../../libs/router/helpers'
import { combineActions } from '../../libs/store/helpers'
import { getArticle } from '../articles'
import {
  StoreUsers,
  UsersActionEnum,
  UsersActionsRecord,
  UsersActionUnion
} from './types'

const {
  createAction,
  registerReducer,
  createSelector,
  createRoute,
  createEndPoint
} = createBouchon<
  StoreUsers,
  UsersActionEnum,
  UsersActionUnion,
  UsersActionsRecord
>(
  parseData(
    path.join(__dirname, 'users-data.json'),
    'user-data-json-schema.json'
  )
)

const getUser = createAction(UsersActionEnum.GetUser)
const addUser = createAction(UsersActionEnum.AddUser)
const removeUser = createAction(UsersActionEnum.RemoveUser)

registerReducer(UsersActionEnum.GetUser, (state, action) => {
  return state
})

registerReducer(UsersActionEnum.AddUser, (state, action) => {
  state.users.push(action.bodyParameters)
  return state
})

const selectAllUsers = createSelector((state, action) => {
  return state.users
})

const selectOneUser = createSelector((state, action) => {
  switch (action.name) {
    case UsersActionEnum.GetUser:
    case UsersActionEnum.RemoveUser:
      return selectAllUsers(action).find(
        user => user.id === action.parameters.userId
      )

    default:
      return
  }
})

const endPoint = createEndPoint('/api', [
  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/users',
    // action: getUser,
    action: combineActions(UsersActionEnum.GetUser, [getUser, getArticle]),
    selector: selectAllUsers
  }),

  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/users/:userId',
    action: getUser,
    selector: selectOneUser,
    handler: selectedData => (req, res) => {
      res
        .status(getDefaultResponseStatusCode(selectedData)(req, res))
        .send(`selectedData: ${JSON.stringify(selectedData)}`)
    }
  }),

  createRoute({
    method: 'POST',
    pathname: '/profile/:profileId/users',
    action: addUser,
    selector: selectAllUsers
  }),

  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/usersWithArticles',
    action: getUser,
    selector: selectAllUsers
  })
])

export { endPoint }
