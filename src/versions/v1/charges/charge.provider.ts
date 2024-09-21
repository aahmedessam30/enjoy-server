//Business logic for all charges routes
import { GenerateError } from "../../../services/services"
import { Charge, User, PromoCode } from "../../../db"
import { ChargeStatus } from "../../../interfaces/charge.interface"
import MainProvider from "../index.provider"
import { genUniqueId } from "../../../services"

export default class ChargeProvider extends MainProvider {
  constructor() {
    super("charge")
  }
  async getCharge (id: string) {
    const charge = await Charge.findByPk(id)
    if (!charge) {
      GenerateError({ message: "charge is not found", code: 404 })
    }
    return { charge }
  }

  async getCharges ({ filterDto }) {
    const page = parseInt(filterDto.page) || 0
    const perPage = parseInt(filterDto.perPage) || 15
    const { count, rows } = await Charge.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: page * perPage,
      limit: perPage,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched success",
        payload: { charges: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: "There are not charges yet.!",
        payload: { charges: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async updateChargePayment ({ chargeId, updateChargeDto }) {
    const charge = await Charge.findByPk(chargeId)
    if (!charge) {
      GenerateError({ message: "charge is not found.", code: 404 })
    }
    charge.payment_id = updateChargeDto.paymentId;
    const result = await charge.save()
    return { charge: result }
  }

  async cancelCharge ({ chargeId }) {
    const charge = await Charge.findByPk(chargeId)
    if (!charge) {
      GenerateError({ message: "charge is not found.", code: 404 })
    }
    charge.status = ChargeStatus.FAILED
    await charge.save()
  }

  async createCharge({ userId, body }) {
    const promoCode = await PromoCode.findByPk(body?.promoId, { attributes: ["id"] })
    
    !promoCode && GenerateError({ message: this._i18n("promoNotFound"), code: 404 })

    const transactionId = genUniqueId();
    
    const charge = await Charge.create({
      amount: body.amount,
      total_amount: body.total_amount,
      promoCodeId: body.promoId,
      reservationId: body.reservationId,
      unit_discount_amount: body.unitDiscountAmount,
      promo_amount: body.promoAmount,
      vat_amount: body.vatAmount,
      transactionId: transactionId,
      userId: userId,
    })
  
    return { charge }
  }
}
