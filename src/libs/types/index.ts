/** Helpers */

export type Maybe<T> = T | null

/** State machine */

export type State = Record<string, any>

export interface Action {
  name: string
  parameters?: object
  bodyParameters?: object
  headerParameters?: object
}

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

export type SelectorFn<TState, TActionUnion, TSelectorReturn> = (
  state: TState,
  action: TActionUnion
) => TSelectorReturn

export type Selector<TState, TActionUnion, TSelectorReturn> = (
  action: TActionUnion
) => TSelectorReturn

/** Routing */

export type Route<TState, TActionUnion, TSelectorReturn> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD'
  pathname: string
  action: Action
  selector: Selector<TState, TActionUnion, TSelectorReturn>
}

export type EndPoint = {
  pathname: string
  routes: Array<Route<any, any, any>>
}
