import { random, range, sampleSize, values } from 'lodash'

/**
 * Return one of the two variables.
 */
export function randomValueBetween<T>(...allValues: T[]): T {
  return allValues[random(0, allValues.length - 1)]
}

/**
 * Return a random value in the range.
 */
export function randomNumberInRange(rangeValues: number[]): number {
  return random(rangeValues[0], rangeValues[1])
}

/**
 * Shortcut for `range()` between 2 bounds.
 */
export function rangeNumberBetween(rangeValues: number[]): number[] {
  return range(0, random(rangeValues[0], rangeValues[1]))
}

/**
 * Return a ramdom value of the enum T.
 */
export function randomValueFromEnum<T>(enumValue: object): T {
  return sampleSize(enumValue, 1).pop() as unknown as T
}

/**
 * Return ramdom values from the enum T.
 */
export function randomValuesFromEnum<T>(enumValue: object): T[] {
  const allValuesLength = values(enumValue).length
  return sampleSize(enumValue, randomNumberInRange([0, allValuesLength - 1]))
}

/**
 * Return a random number between 2 bounds.
 */
export function randomValue(rangeNumbers: number[]) {
  return random(rangeNumbers[0], rangeNumbers[1])
}
