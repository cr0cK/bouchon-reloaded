import { Action } from '../../libs/types'

export type StoreUsers = {
  users: Array<{ id: number; name: string }>
  settings: {
    languages: string[]
  }
}

export enum UsersActionEnum {
  UserGet = 'UserGet',
  UserAdd = 'UserAdd',
  UserRemove = 'UserRemove'
}

export interface GetUserAction extends Action {
  name: UsersActionEnum.UserGet
  parameters: {
    profileId: number
    userId: number
  }
}

export interface AddUserAction extends Action {
  name: UsersActionEnum.UserAdd
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
  name: UsersActionEnum.UserRemove
  parameters: {
    profileId: number
    userId: number
  }
}

export type UsersActionUnion = GetUserAction | AddUserAction | RemoveUserAction

export interface UsersActionsRecord
  extends Record<UsersActionEnum, UsersActionUnion> {
  [UsersActionEnum.UserGet]: GetUserAction
  [UsersActionEnum.UserAdd]: AddUserAction
  [UsersActionEnum.UserRemove]: RemoveUserAction
}
