import { MyActionEnum, MyActionsRecord } from '../sample/actions'
import { MyActionUnion } from '../sample/actions'
import { MyStore } from '../sample/store'
import { createCork } from '../libs/store'
import { parseCorkData } from '../libs/store/init'

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
} = await createCork<MyStore, MyActionEnum, MyActionUnion, MyActionsRecord>(
  parseCorkData('users-data.json', 'user-data-json-schema.json')
)

const addUser = createAction(MyActionEnum.UserAdd)
const removeUser = createAction(MyActionEnum.UserRemove)

// removeUser({
//   name: MyActionEnum.UserRemove,
//   parameters: {
//     profileId: 42,
//     id: 1
//   }
// })

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
    case MyActionEnum.UserRemove:
      return selectAllUsers(action).find(
        user => user.id === action.parameters.id
      )

    default:
      return
  }
})

const endPoint = createEndPoint('', [
  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/users',
    action: addUser,
    selector: selectAllUsers
    // handler: (req, res) => {

    // }
  }),

  createRoute({
    method: 'GET',
    pathname: '/profile/:profileId/users',
    action: addUser,
    selector: selectOneUser
  })
])

export default endPoint
