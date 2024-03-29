import { createBouchon, parseDataSync } from '../..'
import * as path from 'path'
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
>(parseDataSync(path.join(__dirname, 'users-data.json')))

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

registerReducer(UsersActionEnum.RemoveUser, (state, action) => {
  state.users = state.users.filter(user => user.id !== action.parameters.userId)
  return state
})

const selectAllUsers = createSelector((state, action) => {
  switch (action.name) {
    case UsersActionEnum.GetUser: {
      return state.users.slice(0, action.queryParameters?.limit)
    }

    default:
      return state.users
  }
})

const selectOneUser = createSelector((state, action) => {
  switch (action.name) {
    case UsersActionEnum.GetUser:
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
    pathname: '/users',
    action: getUser,
    // action: combineActions(UsersActionEnum.GetUser, [
    //   getUser,
    //   { action: getArticle, delay: 1000 }
    // ]),
    selector: selectAllUsers
  }),

  createRoute({
    method: 'GET',
    pathname: '/users/:userId',
    action: getUser,
    selector: selectOneUser
    // handler: selectedData => (req, res) => {
    //   res
    //     .status(getDefaultResponseStatusCode(selectedData)(req, res))
    //     .send(`selectedData: ${JSON.stringify(selectedData)}`)
    // }
  }),

  createRoute({
    method: 'POST',
    pathname: '/users',
    action: addUser,
    selector: selectAllUsers
  }),

  createRoute({
    method: 'DELETE',
    pathname: '/users/:userId',
    action: removeUser
  })
])

export { endPoint }
