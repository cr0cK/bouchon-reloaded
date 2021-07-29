export type State = Record<string, any>

export type ActionId = string

export type Action = () => {
  name: string
  id: ActionId
}

export type Reducer = () => State

export type Reducers = Map<ActionId, Reducer>
