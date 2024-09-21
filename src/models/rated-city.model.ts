import { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IRatedCity, RatedCityStatus } from "../interfaces/reated-city.interface";

export default class RatedCity extends Model<IRatedCity> implements IRatedCity {
  readonly id: string;
  declare cityId?: string | null;
  declare imageId?: string | null;
  declare rate: number;
  declare status: RatedCityStatus;
}
RatedCity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM(...Object.values(RatedCityStatus)),
      allowNull: false,
      defaultValue: RatedCityStatus.ACTIVE
    }
  },
  {
    sequelize,
    modelName: "rated-city",
    timestamps: false
  },
)
