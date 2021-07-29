import { Store } from './store'
import { createAction } from './store/action'
import { createReducers } from './store/reducer'
import { Reducers } from './store/types'

const store = new Store({
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
    language: ['fr', 'en']
  }
})

const addLanguage = createAction('Add language')
const removeLanguage = createAction('Remove language')

const reducers = createReducers([
  [
    addLanguage,
    () => {
      return { id: 1 }
    }
  ],

  [
    removeLanguage,
    () => {
      return { id: 1 }
    }
  ]
])

store.registerReducers(reducers)

store.dispatch(addLanguage)

console.log('state?', store.getState())
