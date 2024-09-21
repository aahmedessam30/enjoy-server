"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../../services/services");
const db_1 = require("../../../db");
const charge_interface_1 = require("../../../interfaces/charge.interface");
const index_provider_1 = __importDefault(require("../index.provider"));
const reservation_interface_1 = require("../../../interfaces/reservation.interface");
const unit_interface_1 = require("../../../interfaces/unit.interface");
const services_2 = require("../../../services");
class ChargeProvider extends index_provider_1.default {
    constructor() {
        super("checkout");
    }
    getOne({ chargeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const charge = yield db_1.Charge.findByPk(chargeId, {
                attributes: {
                    exclude: ['profit', 'host_profit', 'enjoy_fee_percent', 'host_fee', 'host_fee_percent']
                },
                include: { model: db_1.Reservation }
            });
            if (!charge) {
                (0, services_1.GenerateError)({ message: "charge is not found.", code: 404 });
            }
            return { checkout: { charge: charge } };
        });
    }
    acceptCheckout({ chargeId, reservationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const charge = yield db_1.Charge.findByPk(chargeId);
            const reservation = yield db_1.Reservation.findByPk(reservationId);
            if (!charge) {
                (0, services_1.GenerateError)({ message: "charge is not found.", code: 404 });
            }
            if (!reservation) {
                (0, services_1.GenerateError)({ message: "reservation is not found.", code: 404 });
            }
            charge.status = charge_interface_1.ChargeStatus.PAID;
            reservation.status = reservation_interface_1.ReservationStatus.RESERVED;
            const chargeResult = yield charge.save();
            const reservationResult = yield reservation.save();
            return { checkout: { charge: chargeResult, reservation: reservationResult } };
        });
    }
    cancelCheckout({ chargeId, reservationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const charge = yield db_1.Charge.findByPk(chargeId);
            const reservation = yield db_1.Reservation.findByPk(reservationId);
            if (!charge) {
                (0, services_1.GenerateError)({ message: "charge is not found.", code: 404 });
            }
            if (!reservation) {
                (0, services_1.GenerateError)({ message: "reservation is not found.", code: 404 });
            }
            charge.status = charge_interface_1.ChargeStatus.FAILED;
            reservation.status = reservation_interface_1.ReservationStatus.CANCELLED;
            yield charge.save();
            yield reservation.save();
        });
    }
    createCheckout({ userId, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const promoCode = yield db_1.PromoCode.findByPk(body.promoId, { attributes: ["id"] });
            const unit = yield db_1.Unit.findByPk(body === null || body === void 0 ? void 0 : body.unitId, { attributes: ['id', 'status'] });
            !unit && unit.status !== unit_interface_1.UnitStatus.ACTIVE && (0, services_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            const reservation = yield db_1.Reservation.create({
                checkIn: body.checkIn,
                checkOut: body.checkOut,
                unitId: body.unitId,
                nights: body.nights,
                status: reservation_interface_1.ReservationStatus.CREATED,
                userId: userId,
            });
            const transactionId = (0, services_2.genUniqueId)();
            const charge = yield db_1.Charge.create({
                amount: body.amount,
                total_amount: body.total_amount,
                promoCodeId: promoCode === null || promoCode === void 0 ? void 0 : promoCode.id,
                reservationId: reservation === null || reservation === void 0 ? void 0 : reservation.id,
                unit_discount_amount: body.unitDiscountAmount,
                promo_amount: body.promoAmount,
                transactionId: transactionId,
                vat_amount: body.vatAmount,
                userId: userId,
            });
            return { checkout: { reservation, charge } };
        });
    }
}
exports.default = ChargeProvider;
//# sourceMappingURL=checkout.provider.js.map