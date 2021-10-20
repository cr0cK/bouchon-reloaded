import { Action, ActionFn } from '../types'

/**
 * Combine actions to one new action.
 *
 * It allows to dispatch more than one action per route or delayed
 * actions dispatching.
 *
 * Usage:
 *
 * action: combineActions(UsersActionEnum.AddUser, [
 *   addUser,
 *   { action: createPermissions, delay: 1000 }
 * ]),
 */
export function combineActions(
  actionName: string,
  actionFns: Array<ActionFn<any> | { action: ActionFn<any>; delay: number }>
): ActionFn<any> {
  const combinedActionFn = (action: Action) => {
    actionFns.forEach(actionFn => {
      if (typeof actionFn === 'function') {
        actionFn(action)
        return
      }

      // delay action execution
      setTimeout(() => {
        actionFn.action(action)
      }, actionFn.delay)
    })
  }

  // name the action function
  Object.defineProperty(combinedActionFn, 'name', {
    value: actionName,
    writable: false
  })

  return combinedActionFn
}
