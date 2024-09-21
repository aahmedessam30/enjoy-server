import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."

import { ICharge, ChargeStatus } from "../interfaces/charge.interface"
import { IUser } from "../interfaces/user.interface";

export default class Charge extends Model<ICharge> implements ICharge {
  declare readonly id: string
  declare amount: number; //nightly rate.

  declare enjoy_fee: number; // amount * ( enjoy_fee_percent / 100 )
  declare enjoy_fee_percent: number;
  
  declare subtotal: number // amount + enjoy_fee - promo_amount - unit_discount_amount
  declare total_amount: number // vat_amount + subtotal

  declare promoCodeId?: string | null
  declare promo_amount: number;

  declare reservationId?: string | null
  declare transactionId?: string | null

  declare vat_amount: number;
  declare unit_discount_amount: number;

  declare host_profit: number; // host amount - host_fee
  declare host_fee: number; // amount * (host_fee_percent / 100)
  declare host_fee_percent: number;

  declare profit: number // enjoy profit value = ( host_fee + enjoy_fee )
  
  declare payment_id?: string | null; // Thired Party Lib Pay ID

  declare status: ChargeStatus
  declare reference: number;
  declare updatedAt?: Date
  declare createdAt?: Date
  declare userId?: string | null

  declare user?: IUser
}

Charge.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    enjoy_fee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    enjoy_fee_percent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    vat_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    unit_discount_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    promo_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    host_fee: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    host_profit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    host_fee_percent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    profit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    payment_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true,
    },
    reference: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ChargeStatus)),
      allowNull: false,
      defaultValue: ChargeStatus.CREATED,
    },
  },
  {
    sequelize,
    modelName: "charge",
  },
)
