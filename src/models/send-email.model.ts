import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { ISendEmail, EmailStatus } from "../interfaces/send-email.interface"

export default class SendEmail extends Model<ISendEmail> implements ISendEmail {
  declare readonly id: string
  declare userId?: string | null
  declare email: string
  declare template: string
  declare subject: string
  declare context: string
  declare status?: EmailStatus
  declare createdAt?: Date
  declare updatedAt?: Date
}

SendEmail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    template: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    subject: {
      type: "VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin",
      allowNull: false,
    },
    context: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EmailStatus)),
      allowNull: false,
      defaultValue: EmailStatus.ACCEPTED,
    },
  },

  {
    sequelize,
    modelName: "send_email",
  },
)
