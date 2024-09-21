import { DataTypes, Model } from "sequelize"
import sequelize from "."
import { ICity } from "../interfaces/city.interface"

export default class City extends Model<ICity> implements ICity {
  readonly id: string;
  declare countryId?: string | null
  declare lat: string
  declare lng: string
  declare nameAr: string
  declare nameEn: string
  declare createdAt?: Date
  declare updatedAt?: Date
}
City.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nameAr: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nameEn: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lng: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "city",
  },
)
