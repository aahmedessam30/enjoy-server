import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUnitKitchenFeature } from "../interfaces/unit-kitchen-feature.interface"

export default class UnitKitchenFeature extends Model<IUnitKitchenFeature> implements IUnitKitchenFeature {
  declare featureId?: string
  declare readonly id: string
  declare unitId?: string | null
}

UnitKitchenFeature.init(
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
    modelName: "unit_kitchen_feature",
    timestamps: false,
  },
)
