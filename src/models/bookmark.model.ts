import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IBookmark } from "../interfaces/bookmark.interface"
import { IUnit } from "../interfaces/unit.interface"

export default class Bookmark extends Model<IBookmark> implements IBookmark {
  declare readonly id: string
  declare userId?: string | null
  declare unitId?: string | null
  declare createdAt?: Date

  declare units?: IUnit[]
}
Bookmark.init(
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
    modelName: "bookmark",
    updatedAt: false
  },
)
