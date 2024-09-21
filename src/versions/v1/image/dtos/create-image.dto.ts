import { ImageType } from "../../../../interfaces/image.interface";

export class CreateImageDto {
    url: string;
    type: ImageType;
}