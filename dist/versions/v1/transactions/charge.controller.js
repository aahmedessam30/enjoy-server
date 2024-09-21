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
const charge_provider_1 = __importDefault(require("./charge.provider"));
const Charge = new charge_provider_1.default();
class ChargeController {
    getCharge(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { charge } = yield Charge.getCharge(req.params.chargeId);
                res.status(200).json({ message: "fetched successfully", payload: { charge }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getCharges(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Charge.getCharges({ filterDto: req.query });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createCharge(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const { charge } = yield Charge.createCharge({
                    userId,
                    body: req.body,
                });
                res.status(201).json({ message: "charge created.", payload: { charge }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateChargeStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chargeId = req.params.chargeId;
                const { charge } = yield Charge.updateTransactionStatus({
                    chargeId,
                    updateChargeDto: req.body,
                });
                res.status(201).json({ message: "charge updated.", payload: { charge }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    cancelCharge(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Charge.cancelCharge({ chargeId: req.params.chargeId });
                res.status(200).json({ message: "charge deleted!.'", status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = ChargeController;
//# sourceMappingURL=charge.controller.js.map