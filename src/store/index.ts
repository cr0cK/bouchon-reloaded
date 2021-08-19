import { Action, Route, Selector2, SelectorFn, State } from '../types'
import { Store } from './store'

export function createStateMachine<
  TState extends State,
  TActionEnum extends string,
  TActionUnion extends Action,
  TActionsRecord extends Record<TActionEnum, TActionUnion>
>(state: TState) {
  const store = new Store<TState, TActionEnum, TActionsRecord>(state)

  return {
    /**
     * Return a function that dispatchs the action.
     */
    createAction(actionName: keyof TActionsRecord) {
      return (action: TActionsRecord[TActionEnum]): void => {
        store.dispatch(actionName, action)
      }
    },

    /**
     * Register a reducer for a defined action name.
     */
    registerReducer<TActionEnum_ extends TActionEnum>(
      actionName: TActionEnum_,
      reducerFn: (state: TState, action: TActionsRecord[TActionEnum_]) => TState
    ): void {
      store.registerReducer(actionName, reducerFn)
    },

    /**
     * Create a selector.
     */
    createSelector<TSelectorReturn>(
      selectorFn: SelectorFn<TState, TActionUnion, TSelectorReturn>
    ): Selector2<TState, TActionUnion, TSelectorReturn> {
      return (action: TActionUnion) => {
        return selectorFn(state, action)
      }
    },

    createEndPoint(
      endPoint: string,
      routes: Route<TState, TActionUnion, any>[]
    ) {
      // ...
    },

    createRoute<TSelectorReturn>(
      route: Route<TState, TActionUnion, TSelectorReturn>
    ): Route<TState, TActionUnion, TSelectorReturn> {
      return route
    }
  }
}
