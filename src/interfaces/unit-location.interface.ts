export interface IUnitLocation {
  address1?: string
  cityId?: string | null
  countryId?: string | null
  districtId?: string | null
  readonly id: string
  lat: number
  lng: number
  unitId?: string | null
}
