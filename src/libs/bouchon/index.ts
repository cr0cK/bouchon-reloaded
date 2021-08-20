import { Store } from '../store'
import { Action, Route, Selector, SelectorFn, State } from '../types'
import { EndPoint } from './../types/index'

export function createBouchon<
  TState extends State,
  TActionEnum extends string,
  TActionUnion extends Action,
  TActionsRecord extends Record<TActionEnum, TActionUnion>
>(initialState: TState) {
  const store = new Store<TState, TActionEnum, TActionsRecord>(initialState)

  return {
    /**
     * Return a function that dispatchs the action.
     */
    createAction(actionName: keyof TActionsRecord) {
      const actionFn = function (action: TActionsRecord[TActionEnum]): void {
        store.dispatch(actionName, action)
      }

      // name the action function
      Object.defineProperty(actionFn, 'name', {
        value: actionName,
        writable: false
      })

      return actionFn
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
    ): Selector<TState, TActionUnion, TSelectorReturn> {
      return (action: TActionUnion) => {
        return selectorFn(store.getState(), action)
      }
    },

    createEndPoint(
      pathname: string,
      routes: Route<TState, TActionUnion, any>[]
    ): EndPoint {
      return {
        pathname: pathname,
        routes
      }
    },

    createRoute<TSelectorReturn>(
      route: Route<TState, TActionUnion, TSelectorReturn>
    ): Route<TState, TActionUnion, TSelectorReturn> {
      return route
    }
  }
}
