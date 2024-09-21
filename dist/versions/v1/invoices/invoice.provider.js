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
class InvocieProvider extends index_provider_1.default {
    constructor() {
        super("invoice");
    }
    getInvocie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invocie = yield db_1.Invoice.findByPk(id);
            if (!invocie) {
                (0, services_1.GenerateError)({ message: this._i18n("invocieNotFound"), code: 404 });
            }
            return { invocie };
        });
    }
    getInvocies({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Invoice.findAndCountAll({
                where: { userId },
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { invocies: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotInvociesYet"),
                    payload: { invocies: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getDashboardInvoices({ filterDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(filterDto.page) || 0;
            const perPage = parseInt(filterDto.perPage) || 15;
            const { count, rows } = yield db_1.Invoice.findAndCountAll({
                order: [["createdAt", "DESC"]],
                offset: page * perPage,
                limit: perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { invocies: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotInvociesYet"),
                    payload: { invocies: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createInvocie({ createInvocieDto, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Invoice.create({
                total: createInvocieDto.total,
                transactionId: createInvocieDto.transactionId,
                userId: userId,
            });
            return { invoice: result };
        });
    }
}
exports.default = InvocieProvider;
//# sourceMappingURL=invoice.provider.js.map