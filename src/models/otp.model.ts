import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IOtp } from "../interfaces/otp.interface";

export default class OTP extends Model<IOtp> implements IOtp {
  declare readonly id: string
  declare mobile: string
  declare code: number
  declare used?: number | boolean
  declare createdAt?: Date
  declare updatedAt?: Date
}
OTP.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    mobile: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: false,
      // add 5 Minutes to current insertion date.
      defaultValue: new Date(new Date().getTime() + 5 * 60000)
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "otp",
    createdAt: false
  },
)
