import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { FacilityStatus, IFacility } from "../interfaces/facility.interface"

export default class Facility extends Model<IFacility> implements IFacility {
  declare readonly id: string
  declare nameAr: string
  declare nameEn: string
  declare nameFr: string
  declare status: FacilityStatus
  declare createdAt?: Date
  declare updatedAt?: Date
}
Facility.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nameAr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameEn: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    nameFr: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(FacilityStatus)),
      allowNull: false,
      defaultValue: FacilityStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "facility",
  },
)
