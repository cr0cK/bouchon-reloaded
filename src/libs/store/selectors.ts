import { SelectorFn } from '../types'

export function selectNone(): SelectorFn<any, undefined> {
  return () => undefined
}
