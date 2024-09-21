import { EStatus } from "./main.interface"

export interface ICategory {
  readonly id: string
  countryId?: string | null
  nameAr: string
  nameEn: string
  status: EStatus
  createdAt?: Date
  updatedAt?: Date
}