import { Store } from '..'

describe('Store', () => {
  describe('getState()', () => {
    it('should return the state', () => {
      const store = new Store([
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Alice' }
      ])

      expect(store.getState()).toEqual([
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Alice' }
      ])
    })
  })

  describe('dispatch()', () => {
    type State = Array<{ id: number; name: string }>

    let store: Store<State, any, any>

    beforeEach(() => {
      store = new Store<State, any, any>([
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Alice' }
      ])
    })

    it('should update state when an action is dispatched', () => {
      store.registerReducer('AddUser', (state, action) => {
        return state.concat(action)
      })

      store.dispatch('AddUser', { id: 3, name: 'John' })

      expect(store.getState()).toEqual([
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Alice' },
        { id: 3, name: 'John' }
      ])
    })

    it('shouldnt update anything if no reducer has been registered for the dispatched action', () => {
      store.dispatch('AddUser', { id: 3, name: 'John' })

      expect(store.getState()).toEqual([
        { id: 1, name: 'Bob' },
        { id: 2, name: 'Alice' }
      ])
    })
  })
})
