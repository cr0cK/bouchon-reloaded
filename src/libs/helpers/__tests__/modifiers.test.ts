import { MockId } from '../../types'
import { deleteMapValue, updateArrayValue, updateMapValue } from '../modifiers'
import { stringifyData } from '../parseData'

interface IUser {
  name: string
  email: string
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
            email: 'bob@aol.com'
          },
          {
            id: 2,
            name: 'Alice',
            email: 'alice@aol.com'
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

    it('shouldnt update a value if the value is not found', () => {
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
              email: 'bob@aol.com'
            }
          ],
          [
            2,
            {
              name: 'Alice',
              email: 'alice@aol.com'
            }
          ]
        ])
      }
    })

    it('should update a value of the map with a predicate fn', () => {
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

    it('should update a value of the map with a defined key', () => {
      updateMapValue(store.users, 1, {
        name: 'New Bob'
      })

      const str = stringifyData(store)
      expect(str).toMatchSnapshot()
    })

    it('shouldnt update a value if the value is not found', () => {
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

  describe('deleteMapValue', () => {
    let store: { users: Map<MockId, IUser> }

    beforeEach(() => {
      store = {
        users: new Map([
          [
            1,
            {
              name: 'Bob',
              email: 'bob@aol.com'
            }
          ],
          [
            2,
            {
              name: 'Alice',
              email: 'alice@aol.com'
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
