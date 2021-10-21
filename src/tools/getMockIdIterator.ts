import { MockId } from '../libs/types'

/**
 * Return an iterator that yeilds new MockId.
 */
export function* getMockIdIterator<T extends string>(
  entities: T[],
  forEntity: T
): Iterator<MockId> {
  let firstMockId =
    (Object.keys(entities).indexOf(String(forEntity)) + 1) * 100000 + 1

  while (true) {
    yield firstMockId
    firstMockId += 1
  }
}
