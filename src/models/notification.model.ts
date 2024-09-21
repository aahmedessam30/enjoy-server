import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { User } from "../db"
import { INotification, NotificationStatus, NotificationType } from "../interfaces/notification.interface"
import { IUser } from "../interfaces/user.interface"

export default class Notification extends Model<INotification> implements INotification {
  declare readonly id: string
  declare body: string
  declare data?: string
  declare readAt?: Date
  declare status: NotificationStatus
  declare title: string
  declare type: NotificationType
  declare createdAt?: Date
  declare updatedAt?: Date

  declare users?: IUser[]

  declare addUsers: Sequelize.BelongsToManyAddAssociationsMixin<User, string>
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin",
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT + " CHARACTER SET utf8mb4 COLLATE utf8mb4_bin",
      allowNull: false,
    },
    readAt: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(NotificationType)),
      allowNull: false,
      defaultValue: NotificationType.GENERAL,
    },
    data: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(NotificationStatus)),
      allowNull: false,
      defaultValue: NotificationStatus.UNREAD,
    },
  },
  {
    sequelize,
    modelName: "notification",
  },
)
