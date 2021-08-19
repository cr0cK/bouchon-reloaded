import { Store } from '../store'

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
})
