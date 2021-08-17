import { newLogger } from '../libs/logger'
import { Reducers, State } from './types'

const logger = newLogger('Store')

export class Store<S extends State> {
  private _state: S
  private _reducers: Reducers<S> = new Map()

  constructor(state: S) {
    this._state = state
  }

  getState(): S {
    return this._state
  }

  registerReducers(reducers: Reducers<S>): this {
    this._reducers = reducers
    return this
  }

  dispatch(action: { [name: string]: any }): this {
    const reducer = this._reducers.get(action.name)

    if (!reducer) {
      logger.debug(`No reducer found for action "${action.name}"`)
      return this
    }

    logger.debug(`Dispatching action "${action.name}"`)

    this._state = reducer(this._state)

    return this
  }
}
