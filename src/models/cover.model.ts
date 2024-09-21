import { DataTypes, Model } from "sequelize"
import sequelize from "."
import { CoverStatus, ICover } from "../interfaces/cover.interface";

export default class Cover extends Model<ICover> implements ICover {
  readonly id: string;
  declare status: CoverStatus;
}
Cover.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(CoverStatus)),
      allowNull: false,
      defaultValue: CoverStatus.ACTIVE
    }
  },
  {
    sequelize,
    modelName: "cover",
    updatedAt: false
  },
)
