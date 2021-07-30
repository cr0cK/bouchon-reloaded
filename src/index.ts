import { Store } from './store'
import { createAction } from './store/action'
import { createReducers } from './store/reducer'

interface MyState {
  users: Array<{ id: number; name: string }>
  settings: {
    languages: string[]
  }
}

const store = new Store<MyState>({
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

const addLanguage = createAction('Add language')
// const removeLanguage = createAction('Remove language')

const reducers = createReducers<MyState>([
  [
    addLanguage,
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

store.registerReducers(reducers)

store.dispatch(addLanguage)

console.log('state?', store.getState())
