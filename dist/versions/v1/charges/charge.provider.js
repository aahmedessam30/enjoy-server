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
const services_2 = require("../../../services");
class ChargeProvider extends index_provider_1.default {
    constructor() {
        super("charge");
    }
    getCharge(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const charge = yield db_1.Charge.findByPk(id);
            if (!charge) {
                (0, services_1.GenerateError)({ message: "charge is not found", code: 404 });
            }
            return { charge };
        });
    }
    getCharges({ filterDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(filterDto.page) || 0;
            const perPage = parseInt(filterDto.perPage) || 15;
            const { count, rows } = yield db_1.Charge.findAndCountAll({
                include: [
                    {
                        model: db_1.User,
                        attributes: ["id", "name"],
                    },
                ],
                order: [["createdAt", "DESC"]],
                offset: page * perPage,
                limit: perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { charges: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not charges yet.!",
                    payload: { charges: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    updateChargePayment({ chargeId, updateChargeDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const charge = yield db_1.Charge.findByPk(chargeId);
            if (!charge) {
                (0, services_1.GenerateError)({ message: "charge is not found.", code: 404 });
            }
            charge.payment_id = updateChargeDto.paymentId;
            const result = yield charge.save();
            return { charge: result };
        });
    }
    cancelCharge({ chargeId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const charge = yield db_1.Charge.findByPk(chargeId);
            if (!charge) {
                (0, services_1.GenerateError)({ message: "charge is not found.", code: 404 });
            }
            charge.status = charge_interface_1.ChargeStatus.FAILED;
            yield charge.save();
        });
    }
    createCharge({ userId, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const promoCode = yield db_1.PromoCode.findByPk(body === null || body === void 0 ? void 0 : body.promoId, { attributes: ["id"] });
            !promoCode && (0, services_1.GenerateError)({ message: this._i18n("promoNotFound"), code: 404 });
            const transactionId = (0, services_2.genUniqueId)();
            const charge = yield db_1.Charge.create({
                amount: body.amount,
                total_amount: body.total_amount,
                promoCodeId: body.promoId,
                reservationId: body.reservationId,
                unit_discount_amount: body.unitDiscountAmount,
                promo_amount: body.promoAmount,
                vat_amount: body.vatAmount,
                transactionId: transactionId,
                userId: userId,
            });
            return { charge };
        });
    }
}
exports.default = ChargeProvider;
//# sourceMappingURL=charge.provider.js.map