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
const index_provider_1 = __importDefault(require("../index.provider"));
class PlanPreiodProvider extends index_provider_1.default {
    constructor() {
        super("plan-period");
    }
    create({ body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.PlanPeriod.create(body);
            return { planPeriod: result };
        });
    }
    update({ periodId, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const planPeriod = yield db_1.PlanPeriod.findByPk(periodId);
            if (!planPeriod) {
                (0, services_1.GenerateError)({ message: this._i18n("periodNotFound"), code: 404 });
            }
            planPeriod.nameEn = body.nameEn;
            planPeriod.nameAr = body.nameAr;
            planPeriod.price = body.price;
            planPeriod.discount = body.discount;
            planPeriod.periodByMonth = body.periodByMonth;
            const result = yield planPeriod.save();
            return { result };
        });
    }
    list({ limit, page, filters }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitMax = Number(limit) > 50 ? 50 : Number(limit);
            const offset = (Number(page) - 1) * Number(limit);
            const where = this.whereFilters(filters);
            const { count, rows } = yield db_1.PlanPeriod.findAndCountAll({
                limit: limitMax,
                offset: offset,
                where: Object.assign({}, where),
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { periods: rows, totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not periods yet.!",
                    payload: { periods: [], totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    findOne({ periodId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const period = yield db_1.PlanPeriod.findByPk(periodId);
            if (!period) {
                (0, services_1.GenerateError)({ message: this._i18n("periodNotFound"), code: 400 });
            }
            return { period };
        });
    }
    deleteOrActive({ periodId, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const planPeriod = yield db_1.PlanPeriod.findByPk(periodId);
            if (!planPeriod) {
                (0, services_1.GenerateError)({ message: this._i18n("periodNotFound"), code: 404 });
            }
            planPeriod.status = type;
            yield planPeriod.save();
        });
    }
}
exports.default = PlanPreiodProvider;
//# sourceMappingURL=plan-period.provider.js.map