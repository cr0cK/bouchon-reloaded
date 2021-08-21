import { Action } from '../../libs/types'

export type StoreUsers = {
  users: Array<{ id: number; name: string }>
  settings: {
    languages: string[]
  }
}

export enum UsersActionEnum {
  GetUser = 'GetUser',
  AddUser = 'AddUser',
  RemoveUser = 'RemoveUser'
}

export interface GetUserAction extends Action {
  name: UsersActionEnum.GetUser
  parameters: {
    profileId: number
    userId: number
  }
}

export interface AddUserAction extends Action {
  name: UsersActionEnum.AddUser
  parameters: {
    profileId: number
  }
  bodyParameters: {
    id: number
    name: string
    age: number
  }
}

export interface RemoveUserAction extends Action {
  name: UsersActionEnum.RemoveUser
  parameters: {
    profileId: number
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
