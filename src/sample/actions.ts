import { Action } from '../libs/types'

export enum MyActionEnum {
  UserGet = 'UserGet',
  UserAdd = 'UserAdd',
  UserRemove = 'UserRemove'
}

export interface MyActionGetUser extends Action {
  name: MyActionEnum.UserGet
  parameters: {
    profileId: number
    userId: number
  }
}

export interface MyActionAddUser extends Action {
  name: MyActionEnum.UserAdd
  parameters: {
    profileId: number
  }
  bodyParameters: {
    id: number
    name: string
    age: number
  }
}

export interface MyActionRemoveUser extends Action {
  name: MyActionEnum.UserRemove
  parameters: {
    profileId: number
    userId: number
  }
}

export type MyActionUnion =
  | MyActionGetUser
  | MyActionAddUser
  | MyActionRemoveUser

export interface MyActionsRecord extends Record<MyActionEnum, MyActionUnion> {
  [MyActionEnum.UserGet]: MyActionGetUser
  [MyActionEnum.UserAdd]: MyActionAddUser
  [MyActionEnum.UserRemove]: MyActionRemoveUser
}
