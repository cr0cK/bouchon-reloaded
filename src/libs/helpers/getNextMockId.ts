import { MockId } from '../types'

/**
 * Return the next mockId.
 */
export function getNextMockId(mockIds: Array<string | MockId>): number {
  return Math.max(...mockIds.map(mockId => Number(mockId))) + 1
}
