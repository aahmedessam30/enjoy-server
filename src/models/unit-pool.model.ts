import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUnitPool } from "../interfaces/unit-pool.interface"

export default class UnitPool extends Model<IUnitPool> implements IUnitPool {
  declare readonly id: string
  declare length: number;
  declare height: number;
  declare width: number;
}

UnitPool.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    width: {
      type: DataTypes.INTEGER,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "unit_pool",
    timestamps: false,
  },
)
