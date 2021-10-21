import { newLogger } from '../helpers/logger'
import { Action, Reducer, Reducers, State } from '../types'

const logger = newLogger('Store')

export class Store<
  TState extends State,
  TActionEnum extends string,
  TActionsRecord extends Record<TActionEnum, Action>
> {
  private _state: TState
  private _reducers: Reducers<TState, TActionEnum, TActionsRecord> = new Map()

  constructor(state: TState) {
    this._state = state
  }

  getState(): TState {
    return this._state
  }

  registerReducer<TActionEnum extends keyof TActionsRecord>(
    actionName: TActionEnum,
    reducerFn: Reducer<TState, any>
  ): this {
    this._reducers.set(actionName, reducerFn)
    return this
  }

  dispatch<AE extends keyof TActionsRecord>(
    actionName: AE,
    action: TActionsRecord[AE]
  ): this {
    const reducer = this._reducers.get(actionName)

    if (!reducer) {
      logger.debug(`No reducer found for action "${actionName}"`)
      return this
    }

    logger.debug(`Dispatching action "${actionName}"`)

    this._state = reducer(this._state, action)

    return this
  }
}
