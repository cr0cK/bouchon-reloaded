import * as path from 'path'
import { createBouchon } from '../../libs/bouchon'
import { parseData } from '../../libs/bouchon/helpers'
import { getDefaultResponseStatusCode } from '../../libs/router/helpers'
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

const getUser = createAction(UsersActionEnum.UserGet)
const addUser = createAction(UsersActionEnum.UserAdd)
const removeUser = createAction(UsersActionEnum.UserRemove)

registerReducer(UsersActionEnum.UserGet, (state, action) => {
  return state
})

registerReducer(UsersActionEnum.UserAdd, (state, action) => {
  state.users.push(action.bodyParameters)
  return state
})

registerReducer(UsersActionEnum.UserRemove, (state, action) => {
  return state
})

const selectAllUsers = createSelector((state, action) => {
  return state.users
})

const selectOneUser = createSelector((state, action) => {
  switch (action.name) {
    case UsersActionEnum.UserGet:
    case UsersActionEnum.UserRemove:
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
    action: getUser,
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
  })
])

export { endPoint }
