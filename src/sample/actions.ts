export enum MyActionEnum {
  UserAdd = 'UserAdd',
  UserRemove = 'UserRemove'
}

export interface IActionAddUser {
  id: number
  name: string
  age: number
}

export interface IActionRemoveUser {
  id: number
}

export type MyAction = IActionAddUser | IActionRemoveUser

export type ActionRecord<AE extends string, AU> = Record<AE, AU>

export interface MyAction2 extends ActionRecord<MyActionEnum, MyAction> {
  [MyActionEnum.UserAdd]: IActionAddUser
  [MyActionEnum.UserRemove]: IActionRemoveUser
}
