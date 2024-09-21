import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import {Notification} from "../db"
import { ILocation } from "../interfaces/location.interface"
import { IUser, UserCode, UserRole, UserStatus } from "../interfaces/user.interface"
import PromoCode from "./promo-code.model"

export default class User extends Model<IUser> implements IUser {
  declare readonly id: string
  declare authorize: number | boolean
  declare code: UserCode
  declare email?: string
  declare name: string
  declare password?: string
  declare mobile: string
  declare role: UserRole
  declare status: UserStatus
  declare reference: number
  declare createdAt?: Date
  declare updatedAt?: Date

  declare location?: ILocation

  declare addNotification: Sequelize.HasManyAddAssociationsMixin<Notification, number>

  declare getPromo_codes: Sequelize.BelongsToManyGetAssociationsMixin<PromoCode>
}

User.init(
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
    },
    mobile: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.ENUM(...Object.values(UserCode)),
      allowNull: false,
      defaultValue: UserCode._966,
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.GUEST,
    },
    reference: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    authorize: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  },
)
