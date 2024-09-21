export interface IUnitBedroom {
  readonly id: string
  unitId?: string | null;
  roomCount: number;
  singleBedCount: number;
  masterBedCount: number;
}