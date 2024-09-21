import { ILocation } from "./location.interface"
// import { IOtp } from "./otp.interface"


export interface IUser {
  readonly id: string
  authorize: number | boolean
  code: UserCode
  email?: string
  name: string
  password?: string
  mobile: string
  role: UserRole
  status: UserStatus
  createdAt?: Date
  updatedAt?: Date
  reference: number

  location?: ILocation
}

export enum UserCode {
  _966 = "+966",
  _20 = "+20",
}
export enum UserRole {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  HOST = 'HOST'
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface IForgetPW {
  otp: Partial<any>
  newPassword: string
}
