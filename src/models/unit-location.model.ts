import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUnitLocation } from "../interfaces/unit-location.interface"

export default class UnitLocation extends Model<IUnitLocation> implements IUnitLocation {
  declare address1?: string
  declare cityId?: string | null
  declare countryId?: string | null
  declare districtId?: string | null
  declare readonly id: string
  declare lat: number
  declare lng: number
  declare unitId?: string | null
}

UnitLocation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    address1: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "unit_location",
    timestamps: false,
  },
)
