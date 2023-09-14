import * as express from 'express'

/** Helpers */

export type Perhaps<T> = T | null | undefined
export type MaybeUndef<T> = T | undefined
export type Maybe<T> = T | null

/** State machine */

export type State = Record<string, any>

export interface Action {
  name: string
  parameters?: object
  bodyParameters?: object
  headerParameters?: object
  queryParameters?: object
}

export type ActionFn<A> = (action: A) => void

export type Reducer<TState extends State, TActionProps> = (
  state: TState,
  action: TActionProps
) => TState

export type Reducers<
  TState extends State,
  TActionEnum extends string,
  TActionsRecord extends Record<TActionEnum, object>
> = Map<keyof TActionsRecord, Reducer<TState, any>>

/** Selectors */

export type Selector<TState, TActionUnion, TSelectorReturn> = (
  state: TState,
  action: TActionUnion
) => TSelectorReturn

export type SelectorFn<TActionUnion, TSelectorReturn> = (
  action: TActionUnion
) => TSelectorReturn

/** Routing */

export type Route<TActionUnion, TSelectorReturn> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD'
  pathname: string
  action: ActionFn<any>
  selector?: SelectorFn<TActionUnion, TSelectorReturn>
  handler?: (
    selectedData: TSelectorReturn,
    action: TActionUnion
  ) => (req: express.Request, res: express.Response) => void
}

export type AnyRoute = Route<any, any>

export type EndPoint = {
  pathname: string
  routes: Array<Route<any, any>>
}

/** Types helpers */

export interface IMockIdRelation {
  mockId: MockId
  parentMockId: MaybeUndef<MockId>
}

// useful to identify generated items
export type MockId = number
