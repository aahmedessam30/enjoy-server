import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from ".";
import { IUnitTerm } from "../interfaces/unit-term.interface";

export default class UnitTerm extends Model<IUnitTerm> implements IUnitTerm {
  declare readonly id: string
  declare unitId?: string | null
  declare description: string
}

UnitTerm.init(
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
    modelName: "unit_term",
    timestamps: false,
  },
)
