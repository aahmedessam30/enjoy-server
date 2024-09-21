import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IDevice } from "../interfaces/device.interface"
import { EStatus } from "../interfaces/main.interface"

export default class Device extends Model<IDevice> implements IDevice {
  declare createdAt?: Date
  declare readonly id: string
  declare status: EStatus
  declare token: string
  declare updatedAt?: Date
  declare userId?: string | null
}

Device.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EStatus)),
      allowNull: false,
      defaultValue: EStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "device",
  },
)
