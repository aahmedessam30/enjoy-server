import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IInfo } from "../interfaces/info.interface"

export default class Info extends Model<IInfo> implements IInfo {
  declare readonly id: string
  declare key: string
  declare value?: string
  declare createdAt?: Date
  declare updatedAt?: Date
}
Info.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "info",
  },
)
