import { Store } from '@libs/store'
import { EndPoint } from '@libs/types'
import {
  Action,
  ActionFn,
  Route,
  SelectorFn,
  Selector,
  State
} from '@libs/types'

/**
 * Create a new "Bouchon" by binding functions to a store instance.
 */
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
    createAction<TActionName extends keyof TActionsRecord>(
      actionName: TActionName
    ): ActionFn<TActionsRecord[TActionName]> {
      const actionFn = function (action: TActionsRecord[TActionName]): void {
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
      selectorFn: Selector<TState, TActionUnion, TSelectorReturn>
    ): SelectorFn<TActionUnion, TSelectorReturn> {
      return (action: TActionUnion) => {
        return selectorFn(store.getState(), action)
      }
    },

    createEndPoint(
      pathname: string,
      routes: Route<TActionUnion, any>[]
    ): EndPoint {
      return {
        pathname: pathname,
        routes
      }
    },

    createRoute<TSelectorReturn>(
      route: Route<TActionUnion, TSelectorReturn>
    ): Route<TActionUnion, TSelectorReturn> {
      return route
    }
  }
}
