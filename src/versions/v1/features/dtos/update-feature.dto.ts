import { FeatureType } from "../../../../interfaces/feature.interface";

export class UpdateFeatureDto {
    featureId: string;
    nameEn: string;
    nameAr: string;
    type: FeatureType;
}