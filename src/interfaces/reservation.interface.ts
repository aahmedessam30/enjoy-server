export interface IReservation {
  readonly id: string
  checkIn: Date;
  checkOut: Date; 
  nights: number;
  status: ReservationStatus;
  updatedAt?: Date;
  createdAt?: Date
  reference: number;
  userId?: string | null;
  unitId?: string | null;
}

export enum ReservationStatus {
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  RESERVED = 'RESERVED',
}