import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUnitBoard } from "../interfaces/unit-board.interface"

export default class UnitBoard extends Model<IUnitBoard> implements IUnitBoard {
  declare readonly id: string
  declare unitId?: string | null
  declare description: string
}

UnitBoard.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "unit_board",
    timestamps: false,
  },
)
