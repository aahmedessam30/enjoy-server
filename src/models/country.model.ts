import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { ICountry } from "../interfaces/country.interface"

export default class Country extends Model<ICountry> implements ICountry {
  readonly id: string
  declare code: string
  declare createdAt?: Date
  declare nameAr: string
  declare nameEn: string
  declare updatedAt?: Date
}
Country.init(
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
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "country",
  },
)
