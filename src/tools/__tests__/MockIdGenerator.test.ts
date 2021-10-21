import { MockIdGenerator } from '../MockIdGenerator'

enum EntityName {
  user = 'user',
  book = 'book'
}

describe('MockIdGenerator', () => {
  let mockIdGenerator: MockIdGenerator<EntityName>

  beforeEach(() => {
    mockIdGenerator = new MockIdGenerator(Object.values(EntityName))
  })

  it('should generate mockIds', () => {
    const mockIds = [
      mockIdGenerator.newMockId(EntityName.book),
      mockIdGenerator.newMockId(EntityName.book)
    ]

    expect(mockIds).toEqual([200001, 200002])
  })
})
