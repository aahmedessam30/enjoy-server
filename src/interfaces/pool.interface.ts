export interface IPool {
  readonly id: string;
  nameAr: string;
  nameEn: string;
  status: PoolStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum PoolStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}
