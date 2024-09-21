export interface IPropertyArchive {
  createdAt?: Date
  readonly id: string
  propertyId?: string | null
  reason?: string
  updatedAt?: Date
}
