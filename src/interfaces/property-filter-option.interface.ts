export interface IPropertyFilterOption {
  createdAt?: Date
  filterId?: string | null
  filterOptionId?: string | null
  readonly id: string
  propertyId?: number | null
  status: PropertyFilterOptionStatus
  updatedAt?: Date
}

export enum PropertyFilterOptionStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}
