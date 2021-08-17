/** State machine */

export type State = Record<string, any>

export interface ActionProps {
  name: string
  parameters?: object
  bodyParameters?: object
  headerParameters?: object
}

export type Reducer<TState extends State, TActionProps> = (
  state: TState,
  actionProps: TActionProps
) => TState

export type Reducers<
  TState extends State,
  TActionEnum extends string,
  TActionsRecord extends Record<TActionEnum, object>
> = Map<keyof TActionsRecord, Reducer<TState, any>>

/** Selectors */

export type SelectorFn<S, AP, R> = (state: S, actionProps: AP) => R

export type Selector<TState, AP, R> = (
  selectorFn: SelectorFn<TState, AP, R>
) => R

/** Routing */

export type Route<TState, AP, R> = {
  method: 'GET' | 'POST' | 'PATH' | 'PUT' | 'DELETE' | 'HEAD'
  pathname: string
  selector: Selector<TState, AP, R>
}
