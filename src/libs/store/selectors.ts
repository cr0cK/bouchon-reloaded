import { SelectorFn } from '@libs/types'

export function selectNone(): SelectorFn<any, undefined> {
  return () => undefined
}
