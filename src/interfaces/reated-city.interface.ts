import { ICity } from "./city.interface";
import { IImage } from "./image.interface";

export interface IRatedCity {
  readonly id: string
  cityId?: string;
  imageId?: string;
  rate: number;
  status: RatedCityStatus;

  city?: ICity;
  image?: IImage;
}

export enum RatedCityStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}