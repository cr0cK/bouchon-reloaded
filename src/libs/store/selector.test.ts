import { createCork } from '.'

describe('Selector', () => {
  type State = { users: Array<{ id: number; name: string }> }

  describe('createSelector', () => {
    it('should select a part of the state', () => {
      const { createSelector } = createCork<State, any, any, any>({
        users: [
          { id: 1, name: 'Bob' },
          { id: 2, name: 'Alice' }
        ]
      })

      const selectAllUsers = createSelector((state, action) => {
        return state.users
      })

      const selectOneUser = createSelector((state, action) => {
        return selectAllUsers(action).find(user => user.id === action.userId)
      })

      expect(selectOneUser({ userId: 2 })).toEqual({ id: 2, name: 'Alice' })
    })
  })
})
