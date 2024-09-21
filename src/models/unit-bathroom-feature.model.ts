import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUnitBathroomFeature } from "../interfaces/unit-bathroom-feature.interface"

export default class UnitBathroomFeature extends Model<IUnitBathroomFeature> implements IUnitBathroomFeature {
  declare featureId?: string
  declare readonly id: string
  declare unitId?: string | null
}

UnitBathroomFeature.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "unit_bathroom_feature",
    timestamps: false,
  },
)
