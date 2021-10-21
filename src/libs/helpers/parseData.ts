import * as fs from 'fs'
import { replacer, reviver } from './jsonSerializer'
import { newLogger } from './logger'

/**
 * Stringify data with Map/Set support.
 *
 * Usage:
 * stringifyData(generatedData)
 */
export function stringifyData(data: object): string {
  const logger = newLogger('stringifyData')

  try {
    return JSON.stringify(data, replacer, 2)
  } catch (err) {
    logger.error(`Unable to stringify data`, err)
    throw err
  }
}

/**
 * Parse JSON with Map/Set support.
 *
 * Usage:
 * parseData('users-data.json')
 */
export function parseDataSync<TStore>(dataPathname: string): TStore {
  const logger = newLogger('parseDataSync')

  try {
    // TODO Use AJV to verify JSON integrity

    return JSON.parse(fs.readFileSync(dataPathname, 'utf8'), reviver) as TStore
  } catch (err) {
    logger.error(`Unable to parse data`, err)
    throw err
  }
}
