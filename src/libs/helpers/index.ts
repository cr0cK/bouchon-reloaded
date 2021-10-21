import { Perhaps } from '../types'

/**
 * Returns a type predicate to filter undefined values of a list.
 *
 * Usage:
 * myList.filter(isDefined)
 */
export function isDefined<T>(o: Perhaps<T>): o is T {
  return o !== undefined && o !== null
}

/**
 * Ensure that an array is returned if v is null or undefined.
 */
export function ensureArray<T>(v: Perhaps<T | T[]>): T[] {
  if (!isDefined(v)) {
    return []
  }

  if (Array.isArray(v)) {
    return v
  }

  return [v]
}
