import { newLogger } from '../libs/logger/index.'
import { Action, Reducers, State } from './types'

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

  dispatch(action: Action): this {
    const { name, id } = action()
    const reducer = this._reducers.get(id)

    if (!reducer) {
      logger.debug(`No reducer found for action "${name}"`)
      return this
    }

    logger.debug(`Dispatching action "${name}"`)

    this._state = reducer(this._state)

    return this
  }
}
