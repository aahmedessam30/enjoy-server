//Business logic for all Reservations routes
import { GenerateError } from "../../../services/services"
import { City, District, Reservation, Unit, UnitLocation, Image, Charge, UnitTerm, PromoCode } from "../../../db"
import MainProvider from "../index.provider"
import { ReservationStatus } from "../../../interfaces/reservation.interface"
import { Op } from "sequelize";

export default class ReservationProvider extends MainProvider {
  constructor() {
    super("reservation")
  }
  async getReservation (id: string) {
    const reservation = await Reservation.findByPk(id)
    if (!reservation) {
      GenerateError({ message: this._i18n("reservationNotFound"), code: 404 })
    }
    return { reservation }
  }

  async getFullReservation (id: string) {
    const reservation = await Charge.findOne({
      where: { reservationId: id },
      include: [
        {
          model: Reservation,
          attributes: ['id', 'reference', 'checkIn', 'checkOut', 'nights'],
          include: [
            {
              model: Unit,
              attributes: ['id', 'titleAr', 'titleEn', 'details'],
              include: [
                {
                  model: UnitLocation,
                  attributes: ["id", "lat", "lng", "address1"],
                  include: [
                    { model: City, attributes: ["id", "nameAr", "nameEn"] },
                    { model: District, attributes: ["id", "nameAr", "nameEn"] },
                  ],
                },
                { model: Image, attributes: ["id", this.concatImg("url")] },
                { model: UnitTerm, attributes: ["id", 'description'] },
              ],
            }
          ]
        },
        {
          model: PromoCode,
          attributes: ['id', 'discount', 'code']
        }
      ]
    })
    if (!reservation) {
      GenerateError({ message: this._i18n("reservationNotFound"), code: 404 })
    }
    return { reservation }
  }

  async countReservations ({ userId }) {
    const count = await Reservation.count({
      where: { userId, status: ReservationStatus.RESERVED },
    })
    let result: { payload: object; status: string }
    if (count > 0) {
      result = {
        payload: { count },
        status: "success",
      }
    } else {
      result = {
        payload: { count: 0 },
        status: "success",
      }
    }
    return { result }
  }

  async getUpcommingReservations ({ userId, paginationDto }) {
    const page = parseInt(paginationDto?.page) || 1; 
    const limit = parseInt(paginationDto?.limit) || 10;
    const { count, rows } = await Reservation.findAndCountAll({
      include: [
        { 
          model: Unit,
          attributes: {'exclude': ['userId', 'categoryId', 'status']},
          include: [
            { model: Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
            {
              model: UnitLocation,
              attributes: ["id", "cityId", "districtId"],
              required: true,
              include: [
                { model: City, attributes: ["id", "nameAr", "nameEn"] },
                { model: District, attributes: ["id", "nameAr", "nameEn"] },
              ],
            },
          ],
        },
        {
          model: Charge,
          attributes: ['id', 'total_amount']
        }
      ],
      where: { 
        userId, 
        status: ReservationStatus.RESERVED, 
        checkIn: {
          [Op.gt]: new Date(),
        }
      },
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * limit,
      limit: limit,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { reservations: rows, totalItems: count, page: page },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotReservationsYet"),
        payload: { reservations: [], totalItems: count, page: page },
        status: "success",
      }
    }
    return { result }
  }

  async getPreviousReservations ({ userId, paginationDto }) {
    const page = parseInt(paginationDto?.page) || 1; 
    const limit = parseInt(paginationDto?.limit) || 10;
    const { count, rows } = await Reservation.findAndCountAll({
      include: [
        { 
          model: Unit,
          attributes: {'exclude': ['userId', 'categoryId', 'status']},
          include: [
            { model: Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
            {
              model: UnitLocation,
              attributes: ["id", "cityId", "districtId"],
              required: true,
              include: [
                { model: City, attributes: ["id", "nameAr", "nameEn"] },
                { model: District, attributes: ["id", "nameAr", "nameEn"] },
              ],
            },
          ],
        },
        {
          model: Charge,
          attributes: ['id', 'total_amount']
        }
      ],
      where: {
        userId, 
        status: ReservationStatus.RESERVED, 
        checkIn: { [Op.lt]: new Date() }
      },
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * limit,
      limit: limit,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { reservations: rows, totalItems: count, page: page },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotReservationsYet"),
        payload: { reservations: [], totalItems: count, page: page },
        status: "success",
      }
    }
    return { result }
  }

  async getDashboardReservations ({ filterDto }) {
    const page = parseInt(filterDto.page) || 0;
    const perPage = parseInt(filterDto.perPage) || 15;
    const { count, rows } = await Reservation.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset: page * perPage,
      limit: perPage,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { reservations: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotReservationsYet"),
        payload: { reservations: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async acceptReservation ({reservationId}) {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      GenerateError({ message: this._i18n("reservationNotFound"), code: 404 })
    }
    reservation.status = ReservationStatus.RESERVED;
    const result = await reservation.save();
    return { reservation: result }
  }

  async cancelReservation ({reservationId}) {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      GenerateError({ message: this._i18n("reservationNotFound"), code: 404 })
    }
    reservation.status = ReservationStatus.CANCELLED;
    const result = await reservation.save();
    return { reservation: result }
  }

  async createReservation ({ createReservationDto, userId }) {
    const result = await Reservation.create({
      checkIn: createReservationDto.checkIn,
      checkOut: createReservationDto.checkOut,
      unitId: createReservationDto.unitId,
      nights: createReservationDto.nights,
      status: ReservationStatus.CREATED,
      userId: userId,
    })
    return { reservation: result }
  }
}
