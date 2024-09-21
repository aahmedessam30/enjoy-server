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
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const index_provider_1 = __importDefault(require("../index.provider"));
class PromoCodeProvider extends index_provider_1.default {
    constructor() {
        super("promo-code");
    }
    verifyPromoCode({ code }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.PromoCode.findOne({
                where: { code: code },
            });
            if (!result) {
                (0, services_1.GenerateError)({ message: this._i18n("invalidPromoCode"), code: 404 });
            }
            let A = (0, moment_1.default)(new Date());
            let B = (0, moment_1.default)(result.expireDate);
            if (B.diff(A, "days") > 0 === false) {
                (0, services_1.GenerateError)({ message: this._i18n("promoCodeExpired"), code: 404 });
            }
            return { code: result };
        });
    }
    createPromoCode({ createPromoDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const promo = yield db_1.PromoCode.create({
                code: createPromoDto.code,
                discount: createPromoDto.discount,
                expireDate: createPromoDto.expireDate,
                type: createPromoDto.type,
            });
            return { promo };
        });
    }
    list({ limit, page, filters }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitMax = Number(limit) > 50 ? 50 : Number(limit);
            const offset = (Number(page) - 1) * Number(limit);
            const where = this.whereFilters(filters);
            const { count, rows } = yield db_1.PromoCode.findAndCountAll({
                limit: limitMax,
                offset: offset,
                where: Object.assign({}, where),
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { promo: rows, totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not promo yet.!",
                    payload: { promo: [], totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    findOne({ promoId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const promoCode = yield db_1.PromoCode.findOne({ where: { id: promoId } });
            !promoCode && (0, services_1.GenerateError)({ message: this._i18n("promoNotFound"), code: 404 });
            return { promoCode };
        });
    }
    search({ text }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.PromoCode.findAndCountAll({
                where: [{ code: { [sequelize_1.Op.like]: `%${text}%` } }],
                limit: 10,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { codes: rows },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not promo yet.!",
                    payload: { codes: [] },
                    status: "success",
                };
            }
            return { result };
        });
    }
}
exports.default = PromoCodeProvider;
//# sourceMappingURL=promo-code.provider.js.map