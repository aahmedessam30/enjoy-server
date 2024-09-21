import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUnitBedroom } from "../interfaces/unit-bedroom.interface"

export default class UnitBedroom extends Model<IUnitBedroom> implements IUnitBedroom {
  declare readonly id: string
  declare unitId?: string | null;
  declare roomCount: number;
  declare singleBedCount: number;
  declare masterBedCount: number;
}

UnitBedroom.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    roomCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    singleBedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    masterBedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: "unit_bedroom",
    timestamps: false,
  },
)
