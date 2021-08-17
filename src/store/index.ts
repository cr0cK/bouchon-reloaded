import { ActionProps, SelectorFn, State } from '../types'
import { Store } from './store'

export function createStateMachine<
  TState extends State,
  TActionEnum extends string,
  TActionUnion extends ActionProps,
  TActionsRecord extends Record<TActionEnum, TActionUnion>
>(state: TState) {
  const store = new Store<TState, TActionEnum, TActionsRecord>(state)

  return {
    /**
     * Return a function that dispatch the action.
     */
    createAction(actionName: keyof TActionsRecord) {
      return (actionProps: TActionsRecord[TActionEnum]): void => {
        store.dispatch(actionName, actionProps)
      }
    },

    /**
     * Register a reducer for a defined action name.
     */
    registerReducer<TActionEnum_ extends TActionEnum>(
      actionName: TActionEnum_,
      reducerFn: (
        state: TState,
        actionProps: TActionsRecord[TActionEnum_]
      ) => TState
    ): void {
      store.registerReducer(actionName, reducerFn)
    },

    /**
     * Create a selector.
     */
    createSelector<TSelectorReturn>(
      selectorFn: SelectorFn<TState, TActionUnion, TSelectorReturn>
    ) {
      return (actionPayload: TActionsRecord[TActionEnum]) => {
        return {
          value(): TSelectorReturn {
            return selectorFn(store.getState(), actionPayload)
          },

          findOne(key: any, value: any) {
            // ...
          }
        }
      }
    }
  }
}
