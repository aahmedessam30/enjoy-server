import { IImage } from "./image.interface"
import { IReservation } from "./reservation.interface";

export interface IUnit {
  readonly id: string
  titleAr: string;
  titleEn: string;
  appVersion?: string
  categoryId?: string | null
  details: string
  platform?: UnitPlatform
  code: number
  space: number
  priceByDay: number;
  tax: number;
  discount: number;
  totalPriceByDay: number;
  userId?: string | null;
  status: UnitStatus;
  dedicatedTo: DedicatedToType;
  insurance: boolean;
  cancelReservation: boolean;
  views: number;
  bathroomCount: number;
  updatedAt?: Date;
  createdAt?: Date;
  isBookmarked?: boolean;

  images?: IImage[] | null;
  reservations?: IReservation[];

  getFeatures?: (obj?: {joinTableAttributes: string[]}) => void;
}

export enum UnitPlatform {
  IOS = "IOS",
  ANDROID = "ANDROID",
  WEB = "WEB",
  ADMIN = 'ADMIN'
}

export enum UnitStatus {
  ACTIVE = "ACTIVE",
  UNDER_REVIEW = "UNDER_REVIEW",
  PENDING = "PENDING",
  ARCHIVE = "ARCHIVE",
  DELETED = "DELETED",
}

export enum DedicatedToType {
  FAMILY = "FAMILY",
  SINGLES = "SINGLES",
  FAMILY_AND_SINGLES = "FAMILY_AND_SINGLES",
  PAIRES = "PAIRES",
  TRAVELERS = 'TRAVELERS',
  OCCASIONS = 'OCCASIONS'
}
