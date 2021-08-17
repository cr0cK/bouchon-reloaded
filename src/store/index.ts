import { Store } from './store'
import { State } from './types'

export function createStateMachine<
  S extends State,
  ActionEnum extends string,
  Actions extends Record<ActionEnum, object>
>(state: S) {
  const store = new Store<S>(state)

  return {
    createAction<AE extends keyof Actions>(actionName: AE) {
      return (actionPayload: Actions[AE]) => {
        // store.dispatch()
        // TODO
      }
    }
  }
}
