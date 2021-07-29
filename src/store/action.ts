import { Action, ActionId } from './types'
import * as uuid from 'uuid'

export function createAction(name: string): Action {
  const id = uuid.v4()
  return () => ({ name, id })
}
