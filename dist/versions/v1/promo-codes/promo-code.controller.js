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
const promo_code_provider_1 = __importDefault(require("./promo-code.provider"));
const PromoCode = new promo_code_provider_1.default();
class PromoCodeController {
    verifyPomoCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = yield PromoCode.verifyPromoCode({ code: req.params.code });
                res.status(200).json({ message: "verified", payload: { code }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    createPromoCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { promo } = yield PromoCode.createPromoCode({ createPromoDto: req.body, });
                res.status(201).json({ message: "created success.", payload: { promo }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, page, filters } = req.query;
                const { result } = yield PromoCode.list({
                    limit,
                    page,
                    filters,
                });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promoId = req.params.promoId;
                const { promoCode } = yield PromoCode.findOne({ promoId });
                res.status(200).json({ message: "fetched success.", payload: { promoCode }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield PromoCode.search({ text: req.query.s || "", });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = PromoCodeController;
//# sourceMappingURL=promo-code.controller.js.map