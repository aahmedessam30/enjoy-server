import { IImage } from "./image.interface";

export interface ICover {
  readonly id: string
  imageId?: string;
  status: CoverStatus;

  image?: IImage;
}

export enum CoverStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}