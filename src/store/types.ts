export interface IAction<N = string, P = object> {
  name: N
  payload: P
}

export type State = Record<string, any>

export type Reducer<S extends State> = (state: S) => S

export type Reducers<S extends State> = Map<any, Reducer<S>>
