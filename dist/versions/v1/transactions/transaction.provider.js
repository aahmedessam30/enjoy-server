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
class TransactionProvider extends index_provider_1.default {
    constructor() {
        super("transaction");
    }
    getTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.Transaction.findByPk(id);
            if (!transaction) {
                (0, services_1.GenerateError)({ message: "Transaction is not found", code: 404 });
            }
            return { transaction };
        });
    }
    getTransactions({ filterDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(filterDto.page) || 0;
            const perPage = parseInt(filterDto.perPage) || 15;
            const { count, rows } = yield db_1.Transaction.findAndCountAll({
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
                    payload: { transactions: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not transactions yet.!",
                    payload: { transactions: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    updateTransactionStatus({ transactionId, updateTransactionDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.Transaction.findByPk(transactionId);
            if (!transaction) {
                (0, services_1.GenerateError)({ message: "transaction is not found.", code: 404 });
            }
            transaction.status = updateTransactionDto.status;
            const result = yield transaction.save();
            return { transaction: result };
        });
    }
    removeTransaction({ transactionId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.Transaction.findByPk(transactionId);
            if (!transaction) {
                (0, services_1.GenerateError)({ message: "Transaction is not found.", code: 404 });
            }
            transaction.status = charge_interface_1.TransactionStatus.DELETED;
            yield transaction.save();
        });
    }
    createTransaction({ userId, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const promoCode = yield db_1.PromoCode.findByPk(body.promoId, { attributes: ["id"] });
            !promoCode && (0, services_1.GenerateError)({ message: this._i18n("promoNotFound"), code: 404 });
            const transaction = yield db_1.Transaction.create({
                amount: body.amount,
                amountAfterDiscount: body.amountAfterDiscount,
                promoCodeId: body.promoId,
                userId: userId,
            });
            return { transaction };
        });
    }
}
exports.default = TransactionProvider;
//# sourceMappingURL=transaction.provider.js.map