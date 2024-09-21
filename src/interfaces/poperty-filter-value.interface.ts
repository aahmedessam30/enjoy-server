export interface IPropertyFilterValue {
  readonly id: string
  createdAt?: Date
  filterId?: string | null
  propertyId?: number | null
  status: PropertyFilterValueStatus
  updatedAt?: Date
  value: string
}

export enum PropertyFilterValueStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}
