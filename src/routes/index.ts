import { createEndPoint } from '../functions'
import { MyActionRecord, MyActionEnum } from '../sample/actions'
import { MyStore } from '../sample/store'
import { createStateMachine } from '../store'
import { MyActionUnion } from './../sample/actions'

const { createAction, registerReducer, createSelector } = createStateMachine<
  MyStore,
  MyActionEnum,
  MyActionUnion,
  MyActionRecord
>({
  users: [
    {
      id: 1,
      name: 'John'
    },
    {
      id: 2,
      name: 'Alice'
    }
  ],
  settings: {
    languages: ['fr', 'en']
  }
})

const addUser = createAction(MyActionEnum.UserAdd)
const removeUser = createAction(MyActionEnum.UserRemove)

// removeUser({
//   name: MyActionEnum.UserRemove,
//   parameters: {
//     profileId: 42,
//     id: 1
//   }
// })

registerReducer(MyActionEnum.UserAdd, (state, actionProps) => {
  return state
})

registerReducer(MyActionEnum.UserRemove, (state, actionProps) => {
  return state
})

const selectAllUsers = createSelector((state, actionProps) => {
  return state.users
})

const selectOneUser = createSelector((state, actionProps) => {
  switch (actionProps.name) {
    case MyActionEnum.UserAdd:
      break

    default:
      break
  }

  return selectAllUsers(state).findOne('id', actionProps.parameters.profileId)
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
