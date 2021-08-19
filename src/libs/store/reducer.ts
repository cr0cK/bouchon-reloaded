// import { Action, Reducer, Reducers, State } from './types'

// export function createReducers<S extends State>(
//   reducerTuples: Array<[Action, Reducer<S>]>
// ): Reducers<S> {
//   const reducers = reducerTuples.reduce((acc, [action, reducer]) => {
//     return acc.set(action().id, reducer)
//   }, new Map() as Reducers<S>)

//   return reducers
// }
