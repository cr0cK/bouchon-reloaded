import { MockId } from '../../types'
import { deleteMapValue, updateArrayValue, updateMapValue } from '../modifiers'
import { stringifyData } from '../parseData'

interface IUser {
  name: string
  email: string
  roles: string[]
}

describe('modifiers', () => {
  describe('updateArrayValue', () => {
    let store: { users: Array<IUser & { id: number }> }

    beforeEach(() => {
      store = {
        users: [
          {
            id: 1,
            name: 'Bob',
            email: 'bob@aol.com',
            roles: ['user']
          },
          {
            id: 2,
            name: 'Alice',
            email: 'alice@aol.com',
            roles: ['user']
          }
        ]
      }
    })

    it('should update a value of the map', () => {
      const searchedEmail = 'bob@aol.com'

      updateArrayValue(store.users, value => value.email === searchedEmail, {
        name: 'New Bob'
      })

      const str = stringifyData(store)
      expect(str).toMatchSnapshot()
    })

    it('should not update a value if the value is not found', () => {
      const searchedEmail = 'notfound@aol.com'

      updateArrayValue(store.users, value => value.email === searchedEmail, {
        name: 'New Bob'
      })

      const str = stringifyData(store)
      expect(str).toMatchSnapshot()
    })
  })

  describe('updateMapValue', () => {
    let store: { users: Map<MockId, IUser> }

    beforeEach(() => {
      store = {
        users: new Map([
          [
            1,
            {
              name: 'Bob',
              email: 'bob@aol.com',
              roles: ['user']
            }
          ],
          [
            2,
            {
              name: 'Alice',
              email: 'alice@aol.com',
              roles: ['user']
            }
          ]
        ])
      }
    })

    describe('with a predicate fn', () => {
      it('should update a value of the map', () => {
        const searchedEmail = 'bob@aol.com'

        updateMapValue(
          store.users,
          ([, value]) => value.email === searchedEmail,
          {
            name: 'New Bob'
          }
        )

        const str = stringifyData(store)
        expect(str).toMatchSnapshot()
      })
    })

    describe('with a defined key', () => {
      it('should update a value of the map', () => {
        updateMapValue(store.users, 1, {
          name: 'New Bob'
        })

        const str = stringifyData(store)
        expect(str).toMatchSnapshot()
      })

      it('should update list values by concatenation', () => {
        updateMapValue(store.users, 1, {
          name: 'New Bob',
          roles: ['admin']
        })

        const str = stringifyData(store)
        expect(str).toMatchSnapshot()
      })

      it('should update list values by overriding', () => {
        updateMapValue(
          store.users,
          1,
          {
            name: 'New Bob',
            roles: ['admin']
          },
          { concatArrays: false }
        )

        const str = stringifyData(store)
        expect(str).toMatchSnapshot()
      })

      it('should not update a value if the value is not found', () => {
        const searchedEmail = 'notfound@aol.com'

        updateMapValue(
          store.users,
          ([, value]) => value.email === searchedEmail,
          {
            name: 'New Bob'
          }
        )

        updateMapValue(store.users, -1, {
          name: 'New Bob'
        })

        const str = stringifyData(store)
        expect(str).toMatchSnapshot()
      })
    })
  })

  describe('deleteMapValue', () => {
    let store: { users: Map<MockId, IUser> }

    beforeEach(() => {
      store = {
        users: new Map([
          [
            1,
            {
              name: 'Bob',
              email: 'bob@aol.com',
              roles: ['user']
            }
          ],
          [
            2,
            {
              name: 'Alice',
              email: 'alice@aol.com',
              roles: ['user']
            }
          ]
        ])
      }
    })

    it('should delete a value of the map with a defined key', () => {
      deleteMapValue(store.users, 1)

      const str = stringifyData(store)
      expect(str).toMatchSnapshot()
    })

    it('should delete a value of the map with a predicate fn', () => {
      const searchedEmail = 'bob@aol.com'

      deleteMapValue(store.users, ([, value]) => value.email === searchedEmail)

      const str = stringifyData(store)
      expect(str).toMatchSnapshot()
    })
  })
})
