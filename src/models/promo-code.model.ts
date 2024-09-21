import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IPromoCode, PromoCodetType } from "../interfaces/promo-code.interface"
import { EStatus } from "../interfaces/main.interface"

export default class PromoCode extends Model<IPromoCode> implements IPromoCode {
  declare readonly id: string
  declare code: string
  declare discount: number
  declare expireDate?: Date
  declare status: EStatus
  declare type: PromoCodetType
  declare createdAt?: Date
  declare updatedAt?: Date
}

PromoCode.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    discount: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    expireDate: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PromoCodetType)),
      allowNull: false,
      defaultValue: PromoCodetType.UNITS,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(EStatus)),
      allowNull: false,
      defaultValue: EStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "promo_code",
  },
)
