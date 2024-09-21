import { DedicatedToType, UnitPlatform, UnitStatus } from "../../../../interfaces/unit.interface";

export class CreateUnitDto {
    titleAr: string;
    titleEn: string;
    userId: string;
    platform: UnitPlatform;
    dedicatedTo: DedicatedToType;
    appVersion: string;
    categoryId: string;
    space: number;
    priceByDay: number;
    tax: number;
    discount: number;
    status: UnitStatus;
    insurance: boolean;
    cancelReservation: boolean;
    code: number;
    details: string;
    totalPriceByDay: number;
    bathroomCount: number;
}