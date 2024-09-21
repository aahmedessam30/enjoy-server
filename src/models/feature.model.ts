import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { FeatureStatus, FeatureType, IFeature } from "../interfaces/feature.interface"

export default class Feature extends Model<IFeature> implements IFeature {
  declare createdAt?: Date
  declare readonly id: string
  declare nameAr: string
  declare nameEn: string
  declare type: FeatureType
  declare status: FeatureStatus
  declare updatedAt?: Date
}
Feature.init(
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
    type: {
      type: DataTypes.ENUM(...Object.values(FeatureType)),
      allowNull: false,
      defaultValue: FeatureType.GENERAL,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(FeatureStatus)),
      allowNull: false,
      defaultValue: FeatureStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "feature",
  },
)
