import * as fs from 'fs'
import { newLogger } from '../libs/logger'

/**
 * Parse JSON and verify integrify via a JSON schema.
 *
 * Usage:
 *
 * const { ... } = await createCork<...>(
 *   parseCorkData('users-data.json', 'user-data-json-schema.json')
 * )
 */
export async function parseCorkData<TStore>(
  dataPathname: string,
  jsonSchemaPathname: string
): Promise<TStore> {
  const logger = newLogger('parseJSONAsStore')

  try {
    // TODO Use AJV to verify JSON integrity

    return JSON.parse(
      await fs.promises.readFile(dataPathname, 'utf8')
    ) as TStore
  } catch (err) {
    logger.error(`Can't parse ${dataPathname}, exiting.`)
    process.exit(1)
  }
}
