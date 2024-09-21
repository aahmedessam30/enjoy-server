export interface IFeature {
  readonly id: string;
  nameAr: string;
  nameEn: string;
  type: FeatureType;
  status: FeatureStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum FeatureStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}

export enum FeatureType {
  GENERAL = "GENERAL",
  KITCHEN = "KITCHEN",
  BATHROOM = 'BATHROOM'
}
