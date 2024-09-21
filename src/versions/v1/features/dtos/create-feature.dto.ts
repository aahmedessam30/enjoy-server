import { FeatureType } from "../../../../interfaces/feature.interface";

export class CreateFeatureDto {
    nameEn: string;
    nameAr: string;
    type: FeatureType;
}