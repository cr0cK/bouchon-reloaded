import { Action } from '../..'

export type StoreUsers = {
  users: Array<{ id: number; name: string }>
}

export enum UsersActionEnum {
  GetUser = 'GetUser',
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser'
}

export interface GetUserAction extends Action {
  name: UsersActionEnum.GetUser
  parameters: {
    userId: number
  }
  queryParameters?: {
    limit?: number
  }
}

export interface AddUserAction extends Action {
  name: UsersActionEnum.AddUser
  parameters: {}
  bodyParameters: {
    id: number
    name: string
    age: number
  }
}

export interface RemoveUserAction extends Action {
  name: UsersActionEnum.RemoveUser
  parameters: {
    userId: number
  }
}

export type UsersActionUnion = GetUserAction | AddUserAction | RemoveUserAction

export interface UsersActionsRecord
  extends Record<UsersActionEnum, UsersActionUnion> {
  [UsersActionEnum.GetUser]: GetUserAction
  [UsersActionEnum.AddUser]: AddUserAction
  [UsersActionEnum.RemoveUser]: RemoveUserAction
}
