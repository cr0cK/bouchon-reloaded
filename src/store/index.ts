import { newLogger } from '../libs/logger/index.'
import { Action, Reducers, State } from './types'

const logger = newLogger('Store')

export class Store {
  private _state: State = {}
  private _reducers: Reducers = new Map()

  constructor(state: State) {
    this._state = state
  }

  getState(): State {
    return this._state
  }

  registerReducers(reducers: Reducers): this {
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

    this._state = reducer()

    return this
  }
}
