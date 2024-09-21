export interface ICity {
  readonly id: string
  countryId?: string | null
  lat: string
  lng: string
  nameAr: string
  nameEn: string
  createdAt?: Date
  updatedAt?: Date
}
