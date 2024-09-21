import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IDistrict } from "../interfaces/district.interface"

export default class District extends Model<IDistrict> implements IDistrict {
  declare readonly id: string
  declare cityId?: string | null
  declare lat: string
  declare lng: string
  declare nameAr: string
  declare nameEn: string
  declare createdAt?: Date
  declare updatedAt?: Date
}
District.init(
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
    },
    nameEn: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lng: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "district",
  },
)
