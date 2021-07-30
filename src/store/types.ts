export type State = Record<string, any>

export type ActionId = string

export type Action = () => {
  name: string
  id: ActionId
}

export type Reducer<S extends State> = (state: S) => S

export type Reducers<S extends State> = Map<ActionId, Reducer<S>>
