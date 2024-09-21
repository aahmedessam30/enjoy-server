export interface IImage {
  readonly id: string
  url: string
  type: ImageType
  createdAt?: Date
  updatedAt?: Date
}

export enum ImageType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  _3D = "3D",
  PDF = "PDF",
}
