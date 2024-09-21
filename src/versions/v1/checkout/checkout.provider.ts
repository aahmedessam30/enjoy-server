//Business logic for all checkout routes
import { GenerateError } from "../../../services/services"
import { Charge,  PromoCode, Reservation, Unit } from "../../../db"
import { ChargeStatus } from "../../../interfaces/charge.interface"
import MainProvider from "../index.provider"
import { ReservationStatus } from "../../../interfaces/reservation.interface"
import { UnitStatus } from "../../../interfaces/unit.interface"
import { genUniqueId } from "../../../services"

export default class ChargeProvider extends MainProvider {
  constructor() {
    super("checkout")
  }

  async getOne ({ chargeId }: { chargeId: string }) {
    const charge = await Charge.findByPk(chargeId, {
      attributes: { 
        exclude: ['profit', 'host_profit', 'enjoy_fee_percent', 'host_fee', 'host_fee_percent']
      },
      include: { model: Reservation }
    });
    if (!charge) {
      GenerateError({ message: "charge is not found.", code: 404 })
    }

    return { checkout: {charge: charge } }
  }

  async acceptCheckout ({ chargeId, reservationId }: {reservationId: string; chargeId: string}) {
    const charge = await Charge.findByPk(chargeId);
    const reservation = await Reservation.findByPk(reservationId)
    if (!charge) {
      GenerateError({ message: "charge is not found.", code: 404 })
    }
    if (!reservation) {
      GenerateError({ message: "reservation is not found.", code: 404 })
    }
    charge.status = ChargeStatus.PAID;
    reservation.status = ReservationStatus.RESERVED;

    const chargeResult = await charge.save();
    const reservationResult = await reservation.save();

    return { checkout: {charge: chargeResult, reservation: reservationResult} }
  }

  async cancelCheckout ({ chargeId, reservationId }: {reservationId: string; chargeId: string}) {
    const charge = await Charge.findByPk(chargeId);
    const reservation = await Reservation.findByPk(reservationId)
    if (!charge) {
      GenerateError({ message: "charge is not found.", code: 404 })
    }
    if (!reservation) {
      GenerateError({ message: "reservation is not found.", code: 404 })
    }

    charge.status = ChargeStatus.FAILED;
    reservation.status = ReservationStatus.CANCELLED;

    await charge.save();
    await reservation.save();
  }

  async createCheckout ({ userId, body }) {
    const promoCode = await PromoCode.findByPk(body.promoId, { attributes: ["id"] })
    const unit = await Unit.findByPk(body?.unitId, {attributes: ['id', 'status']});

    // !promoCode && GenerateError({ message: this._i18n("promoNotFound"), code: 404 });
    !unit && unit.status !== UnitStatus.ACTIVE && GenerateError({ message: this._i18n("unitNotFound"), code: 404 });
    
    const reservation = await Reservation.create({
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      unitId: body.unitId,
      nights: body.nights,
      status: ReservationStatus.CREATED,
      userId: userId,
    })

    const transactionId = genUniqueId();
  
    const charge = await Charge.create({
      amount: body.amount,
      total_amount: body.total_amount,
      promoCodeId: promoCode?.id,
      reservationId: reservation?.id,
      unit_discount_amount: body.unitDiscountAmount,
      promo_amount: body.promoAmount,
      transactionId: transactionId,
      vat_amount: body.vatAmount,
      userId: userId,
    })
  
    return { checkout: { reservation, charge } };
  }
}
