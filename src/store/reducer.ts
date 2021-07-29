import { Action, Reducer, Reducers } from './types'

export function createReducers(
  reducerTuples: Array<[Action, Reducer]>
): Reducers {
  const reducers = reducerTuples.reduce((acc, [action, reducer]) => {
    return acc.set(action().id, reducer)
  }, new Map() as Reducers)

  return reducers
}
