import { merge } from 'lodash'
import { Maybe, MaybeUndef } from '../types'

type UpdateMapValuePredicateFn<K, V> = ([k, v]: [K, V]) => boolean

/**
 * Update a value of an array.
 */
export function updateArrayValue<T>(
  array: T[],
  searchPredicate: (value: T) => boolean,
  value: Partial<T>
): T[] {
  const index = array.findIndex(searchPredicate)

  if (index < 0) {
    return array
  }

  array.splice(index, 1, merge(array[index], value))

  return array
}

/**
 * Update a value of a map.
 */
export function updateMapValue<K extends string | number, V>(
  map: Map<K, V>,
  keyOrSearchPredicate: K | UpdateMapValuePredicateFn<K, V>,
  value: Partial<V>
): Map<K, V> {
  function getEntry(): MaybeUndef<[K, V]> {
    if (typeof keyOrSearchPredicate === 'function') {
      return Array.from(map.entries()).find(keyOrSearchPredicate)
    }

    const entry = map.get(keyOrSearchPredicate)

    if (!entry) {
      return
    }

    return [keyOrSearchPredicate, entry]
  }

  const entry = getEntry()

  if (!entry) {
    return map
  }

  const [entryKey, entryValue] = entry

  map.set(entryKey, merge(entryValue, value))

  return map
}
