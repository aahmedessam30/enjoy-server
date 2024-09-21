//Business logic for Promo Code
import { GenerateError } from "../../../services/services"
import { PromoCode } from "../../../db"
import moment from "moment"
import { Op } from "sequelize"
import MainProvider from "../index.provider"
import NotificationProvider from "../notifications/notification.provider"

export default class PromoCodeProvider extends MainProvider {
  notify: NotificationProvider
  constructor() {
    super("promo-code")
  }
  async verifyPromoCode({ code }) {
    const result = await PromoCode.findOne({
      where: { code: code },
    })
    if (!result) {
      GenerateError({ message: this._i18n("invalidPromoCode"), code: 404 })
    }
    let A = moment(new Date())
    let B = moment(result.expireDate)
    if (B.diff(A, "days") > 0 === false) {
      GenerateError({ message: this._i18n("promoCodeExpired"), code: 404 })
    }
    return { code: result }
  }

  async createPromoCode({ createPromoDto }) {
    const promo = await PromoCode.create({
      code: createPromoDto.code,
      discount: createPromoDto.discount,
      expireDate: createPromoDto.expireDate,
      type: createPromoDto.type,
    })
    return { promo }
  }
  async list({ limit, page, filters }) {
    const limitMax = Number(limit) > 50 ? 50 : Number(limit)
    const offset = (Number(page) - 1) * Number(limit)
    const where = this.whereFilters(filters)
    const { count, rows } = await PromoCode.findAndCountAll({
      limit: limitMax,
      offset: offset,
      where: { ...where },
    })
    let result: any;
    if (count > 0) {
      result = {
        message: "fetched success",
        payload: { promo: rows, totalItems: count, limit: limitMax, currentPage: page },
        status: "success",
      }
    } else {
      result = {
        message: "There are not promo yet.!",
        payload: { promo: [], totalItems: count, limit: limitMax, currentPage: page },
        status: "success",
      }
    }
    return { result }
  }

  async findOne({ promoId }) {
    const promoCode = await PromoCode.findOne({where: { id: promoId }})

    !promoCode && GenerateError({ message: this._i18n("promoNotFound"), code: 404 })

    return { promoCode }
  }

  async search({ text }) {
    const { count, rows } = await PromoCode.findAndCountAll({
      where: [{ code: { [Op.like]: `%${text}%` } }],
      limit: 10,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched success",
        payload: { codes: rows },
        status: "success",
      }
    } else {
      result = {
        message: "There are not promo yet.!",
        payload: { codes: [] },
        status: "success",
      }
    }
    return { result }
  }
}
