import { newLogger } from '../logger'
import * as fs from 'fs'

/**
 * Parse JSON and verify integrify via a JSON schema.
 *
 * Usage:
 *
 * const { ... } = createCork<...>(
 *   parseData('users-data.json')
 * )
 */
export function parseData<TStore>(dataPathname: string): TStore {
  const logger = newLogger('parseJSONAsStore')

  try {
    // TODO Use AJV to verify JSON integrity

    return JSON.parse(fs.readFileSync(dataPathname, 'utf8')) as TStore
  } catch (err) {
    logger.error(`Can't parse ${dataPathname}, exiting.`, err)
    process.exit(1)
  }
}

/**
 * Return the Id following the latest.
 */
export function getNextId<T extends { id: number }>(
  collection: Array<T>
): number {
  return Math.max(...collection.map(item => item.id)) + 1
}
