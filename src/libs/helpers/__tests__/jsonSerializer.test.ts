import { MockIdGenerator } from '../../../tools/MockIdGenerator'
import { MockId } from '../../types'
import { replacer, reviver } from '../jsonSerializer'

enum MockEntity {
  user = 'user'
}

interface IUser {
  name: string
  email: string
}

describe('jsonSerializer', () => {
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

  describe('replacer', () => {
    it('should serialize data with maps', () => {
      const json = JSON.stringify(data, replacer)

      expect(json).toBe(
        '{"users":{"dataType":"Map","value":[[100001,{"name":"Bob","email":"bob@aol.com"}],[100002,{"name":"Alice","email":"alice@aol.com"}]]}}'
      )
    })
  })

  describe('reviver', () => {
    it('should unserialize data with maps', () => {
      const json = JSON.parse(JSON.stringify(data, replacer), reviver)
      expect(json).toEqual(data)
    })
  })
})

// jest.mock('fs', () => {
//   return {
//     readFileSync(): string {
//       return {
//         fr: {
//           Hello: 'Salut'
//         },
//         en: {
//           Hello: 'Hello'
//         },
//         jp: {
//           Hello: '嗨'
//         }
//       }
//     }
//   }
// })
