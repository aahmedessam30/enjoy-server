import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IImage, ImageType } from "../interfaces/image.interface"

export default class Image extends Model<IImage> implements IImage {
  declare readonly id: string
  declare url: string
  declare type: ImageType
  declare createdAt?: Date
  declare updatedAt?: Date
}
Image.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ImageType)),
      defaultValue: ImageType.IMAGE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "image",
  },
)
