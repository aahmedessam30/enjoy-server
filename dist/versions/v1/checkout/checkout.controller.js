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
const checkout_provider_1 = __importDefault(require("./checkout.provider"));
const charge_interface_1 = require("../../../interfaces/charge.interface");
const Checkout = new checkout_provider_1.default();
class ChargeController {
    getOne(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { checkout } = yield Checkout.getOne({ chargeId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.chargeId, });
                res.status(200).json({ message: "fetch charge success.", payload: { checkout }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createCheckout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const { checkout } = yield Checkout.createCheckout({ userId, body: req.body, });
                res.status(201).json({ message: "reservation created.", payload: { checkout }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    acceptCheckout(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chargeId = req.params.chargeId;
                const reservationId = req.params.reservationId;
                const { checkout } = yield Checkout.acceptCheckout({ chargeId, reservationId });
                if (((_a = checkout === null || checkout === void 0 ? void 0 : checkout.charge) === null || _a === void 0 ? void 0 : _a.status) === charge_interface_1.ChargeStatus.PAID) {
                    console.log(`enjoy://pay/1?chargeId=${chargeId}`);
                    res.status(200).redirect(`enjoy://pay/1?chargeId=${chargeId}`);
                }
                else {
                    res.status(200).redirect(`enjoy://pay/0`);
                }
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    cancelCheckout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chargeId = req.params.chargeId;
                const reservationId = req.params.reservationId;
                yield Checkout.cancelCheckout({ chargeId, reservationId });
                res.status(200).json({ message: "reservation cancelled!.'", status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = ChargeController;
//# sourceMappingURL=checkout.controller.js.map