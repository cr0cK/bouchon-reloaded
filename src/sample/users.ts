import * as path from 'path'
import { startCork } from '../libs/router'
import { createCork } from '../libs/store'
import { parseData } from '../libs/store/init'
import { MyActionEnum, MyActionsRecord } from '../sample/actions'
import { MyActionUnion } from '../sample/actions'
import { MyStore } from '../sample/store'

// const {
//   createAction,
//   registerReducer,
//   createSelector,
//   createRoute,
//   createEndPoint
// } = createCork<MyStore, MyActionEnum, MyActionUnion, MyActionsRecord>({
//   users: [
//     {
//       id: 1,
//       name: 'John'
//     },
//     {
//       id: 2,
//       name: 'Alice'
//     }
//   ],
//   settings: {
//     languages: ['fr', 'en']
//   }
// })

// const r = parseJSONAsStore<MyStore>('users-data.json')

const {
  createAction,
  registerReducer,
  createSelector,
  createRoute,
  createEndPoint
} = createCork<MyStore, MyActionEnum, MyActionUnion, MyActionsRecord>(
  parseData(
    path.join(__dirname, 'users-data.json'),
    'user-data-json-schema.json'
  )
)

const getUser = createAction(MyActionEnum.UserGet)
const addUser = createAction(MyActionEnum.UserAdd)
const removeUser = createAction(MyActionEnum.UserRemove)

// removeUser({
//   name: MyActionEnum.UserRemove,
//   parameters: {
//     profileId: 42,
//     id: 1
//   }
// })

registerReducer(MyActionEnum.UserGet, (state, action) => {
  return state
})

registerReducer(MyActionEnum.UserAdd, (state, action) => {
  return state
})

registerReducer(MyActionEnum.UserRemove, (state, action) => {
  return state
})

const selectAllUsers = createSelector((state, action) => {
  return state.users
})

const selectOneUser = createSelector((state, action) => {
  switch (action.name) {
    case MyActionEnum.UserGet:
    case MyActionEnum.UserRemove:
      return selectAllUsers(action).find(
        user => user.id === action.parameters.userId
      )

    default:
      return
  }
})

const endPoint = createEndPoint('', [
  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/users',
    action: getUser,
    selector: selectAllUsers
    // handler: (req, res) => {

    // }
  }),

  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/users/:userId',
    action: getUser,
    selector: selectOneUser
    // handler: (req, res) => {

    // }
  }),

  createRoute({
    method: 'POST',
    pathname: '/profile/:profileId/users',
    action: addUser,
    selector: selectOneUser
  })
])

startCork('0.0.0.0', 5000, [endPoint])
