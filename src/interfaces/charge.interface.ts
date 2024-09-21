import { IUser } from "./user.interface"

export interface ICharge {
  readonly id: string;
  amount: number;
  enjoy_fee: number;
  enjoy_fee_percent: number;
  subtotal: number;
  total_amount: number;
  vat_amount: number;
  promo_amount: number;
  unit_discount_amount: number;
  host_profit: number;
  host_fee: number;
  host_fee_percent: number;
  profit: number;
  payment_id?: string;
  createdAt?: Date;
  promoCodeId?: string | null;
  transactionId?: string;
  reservationId?: string;
  reference: number;
  status: ChargeStatus;
  updatedAt?: Date
  userId?: string | null
  user?: IUser
}

export enum ChargeStatus {
  CREATED = "CREATED",
  PAID = "PAID",
  FAILED = "FAILED",
}
