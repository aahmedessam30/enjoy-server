import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IContact } from "../interfaces/contact.interface"

export default class Contact extends Model<IContact> implements IContact {
  declare readonly id: string
  declare email?: string
  declare name: string
  declare message: string
  declare mobile: string
  declare createdAt?: Date
  declare updatedAt?: Date
}

Contact.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "contact",
  },
)
