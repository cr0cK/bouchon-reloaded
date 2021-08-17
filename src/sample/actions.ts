import { ActionProps } from '../types'

export enum MyActionEnum {
  UserAdd = 'UserAdd',
  UserRemove = 'UserRemove'
}

export interface MyActionAddUser extends ActionProps {
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

export interface MyActionRemoveUser extends ActionProps {
  name: MyActionEnum.UserRemove
  parameters: {
    profileId: number
    id: number
  }
}

export type MyActionUnion = MyActionAddUser | MyActionRemoveUser

export interface MyActionRecord extends Record<MyActionEnum, MyActionUnion> {
  [MyActionEnum.UserAdd]: MyActionAddUser
  [MyActionEnum.UserRemove]: MyActionRemoveUser
}
