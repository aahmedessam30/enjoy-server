import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IPool, PoolStatus } from "../interfaces/pool.interface"

export default class Pool extends Model<IPool> implements IPool {
  declare createdAt?: Date
  declare readonly id: string
  declare nameAr: string
  declare nameEn: string
  declare status: PoolStatus
  declare updatedAt?: Date
}
Pool.init(
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
    status: {
      type: DataTypes.ENUM(...Object.values(PoolStatus)),
      allowNull: false,
      defaultValue: PoolStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "pool",
  },
)
