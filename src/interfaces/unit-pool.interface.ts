export interface IUnitPool {
  readonly id: string
  unitId?: string | null;
  poolId?: string | null;
  width: number | null;
  length: number | null;
  height: number | null;
}