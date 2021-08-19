import { Action } from '../types'

export enum MyActionEnum {
  UserAdd = 'UserAdd',
  UserRemove = 'UserRemove'
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
    id: number
  }
}

export type MyActionUnion = MyActionAddUser | MyActionRemoveUser

export interface MyActionsRecord extends Record<MyActionEnum, MyActionUnion> {
  [MyActionEnum.UserAdd]: MyActionAddUser
  [MyActionEnum.UserRemove]: MyActionRemoveUser
}
