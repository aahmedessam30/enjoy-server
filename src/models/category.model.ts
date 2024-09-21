import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { ICategory } from "../interfaces/category.interface"
import { EStatus } from "../interfaces/main.interface"

export default class Category extends Model<ICategory> implements ICategory {
  declare readonly id: string
  declare countryId?: string | null
  declare nameAr: string
  declare nameEn: string
  declare status: EStatus
  declare createdAt?: Date
  declare updatedAt?: Date
}
Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nameAr: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    nameEn: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EStatus)),
      allowNull: false,
      defaultValue: EStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "category",
  },
)
