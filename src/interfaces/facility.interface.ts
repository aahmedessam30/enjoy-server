export interface IFacility {
  createdAt?: Date
  icon?: string
  readonly id: string
  nameAr: string
  nameEn: string
  nameFr: string
  status: FacilityStatus
  updatedAt?: Date
}

export enum FacilityStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}
