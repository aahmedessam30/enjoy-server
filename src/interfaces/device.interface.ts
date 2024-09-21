import { EStatus } from "./main.interface"

export interface IDevice {
  createdAt?: Date
  readonly id: string
  status: EStatus
  token: string
  updatedAt?: Date
  userId?: string | null
}
