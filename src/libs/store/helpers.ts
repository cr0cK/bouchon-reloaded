import { Action, ActionFn } from '../types'

/**
 * Combine actions to one new action.
 * It allows to dispatch more than one action per route.
 */
export function combineActions(
  actionName: string,
  actionFns: ActionFn<any>[]
): ActionFn<any> {
  const combinedActionFn = (action: Action) => {
    actionFns.forEach(actionFn => {
      actionFn(action)
    })
  }

  // name the action function
  Object.defineProperty(combinedActionFn, 'name', {
    value: actionName,
    writable: false
  })

  return combinedActionFn
}
