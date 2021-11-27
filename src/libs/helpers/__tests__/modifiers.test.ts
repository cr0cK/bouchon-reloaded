import { MockIdGenerator } from '../../../tools/MockIdGenerator'
import { MockId } from '../../types'
import { updateArrayValue, updateMapValue } from '../modifiers'
import { stringifyData } from '../parseData'

enum MockEntity {
  user = 'user'
}

interface IUser {
  name: string
  email: string
}

describe('modifiers', () => {
  describe('updateArrayValue', () => {
    let store: { users: Array<IUser & { id: number }> }

    beforeEach(() => {
      const mockIdsGenerator = new MockIdGenerator<MockEntity>(
        Object.values(MockEntity)
      )

      store = {
        users: [
          {
            id: mockIdsGenerator.newMockId(MockEntity.user),
            name: 'Bob',
            email: 'bob@aol.com'
          },
          {
            id: mockIdsGenerator.newMockId(MockEntity.user),
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
      const mockIdsGenerator = new MockIdGenerator<MockEntity>(
        Object.values(MockEntity)
      )

      store = {
        users: new Map([
          [
            mockIdsGenerator.newMockId(MockEntity.user),
            {
              name: 'Bob',
              email: 'bob@aol.com'
            }
          ],
          [
            mockIdsGenerator.newMockId(MockEntity.user),
            {
              name: 'Alice',
              email: 'alice@aol.com'
            }
          ]
        ])
      }
    })

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

    it('shouldnt update a value if the value is not found', () => {
      const searchedEmail = 'notfound@aol.com'

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
})
