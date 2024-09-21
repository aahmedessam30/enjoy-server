import { EStatus } from "./main.interface"

export interface IPromoCode {
  readonly id: string
  code: string
  discount: number
  expireDate?: Date
  status: EStatus
  type: PromoCodetType
  createdAt?: Date
  updatedAt?: Date
}

export enum PromoCodetType {
  UNITS = 'UNITS'
}
