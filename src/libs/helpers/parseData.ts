import * as fs from 'fs'
import { newLogger } from './logger'

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
