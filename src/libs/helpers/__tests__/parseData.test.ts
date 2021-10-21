import { MockIdGenerator } from '../../../tools/MockIdGenerator'
import { MockId } from '../../types'
import { stringifyData } from '../parseData'

enum MockEntity {
  user = 'user'
}

interface IUser {
  name: string
  email: string
}

describe('parseData', () => {
  describe('stringifyData', () => {
    let data: { users: Map<MockId, IUser> }

    beforeEach(() => {
      const mockIdsGenerator = new MockIdGenerator<MockEntity>(
        Object.values(MockEntity)
      )

      data = {
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

    it('should stringify data', () => {
      const str = stringifyData(data)
      expect(str).toMatchSnapshot()
    })
  })
})
