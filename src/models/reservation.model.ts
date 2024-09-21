import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IReservation, ReservationStatus } from "../interfaces/reservation.interface"

export default class Reservation extends Model<IReservation> implements IReservation {
  declare readonly id: string
  declare reference: number
  declare createdAt?: Date
  declare updatedAt?: Date
  declare checkIn: Date;
  declare checkOut: Date;
  declare nights: number;
  declare status: ReservationStatus;
  declare userId?: string | null
}
Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    reference: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    nights: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
      defaultValue: 0,
    },
    checkIn: {
      type: DataTypes.DATE,
    },
    checkOut: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ReservationStatus)),
      allowNull: false,
      defaultValue: ReservationStatus.CREATED,
    },
  },
  {
    sequelize,
    modelName: "reservation",
  },
)
