import { merge } from 'lodash'

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
export function updateMapValue<K, V>(
  map: Map<K, V>,
  searchPredicate: ([k, v]: [K, V]) => boolean,
  value: Partial<V>
): Map<K, V> {
  const entry = Array.from(map.entries()).find(searchPredicate)

  if (!entry) {
    return map
  }

  const [entryKey, entryValue] = entry

  map.set(entryKey, merge(entryValue, value))

  return map
}
