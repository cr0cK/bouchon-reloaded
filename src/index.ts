import { MyAction2, MyActionEnum } from './sample/actions'
import { MyStore } from './sample/store'
import { createReducers } from './store/reducer'
import { createStateMachine } from './store'

const { createAction } = createStateMachine<MyStore, MyActionEnum, MyAction2>({
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

addUser({
  id: 1,
  name: 'John',
  age: 42
})

const removeUser = createAction(MyActionEnum.UserRemove)

removeUser({
  id: 1
})

// const removeLanguage = createAction('Remove language')

const reducers = createReducers<MyStore>([
  [
    addUser,
    state => {
      return {
        ...state,
        settings: {
          languages: ['fr', 'en', 'jp']
        }
      }
    }
  ]

  // [
  //   removeLanguage,
  //   () => {
  //     return { id: 1 }
  //   }
  // ]
])

// store.registerReducers(reducers)

// store.dispatch(addUser)

// console.log('state?', store.getState())
