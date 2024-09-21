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
const transaction_provider_1 = __importDefault(require("./transaction.provider"));
const Transaction = new transaction_provider_1.default();
class TransactionController {
    getTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transaction } = yield Transaction.getTransaction(req.params.transactionId);
                res.status(200).json({ message: "fetched successfully", payload: { transaction }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getTransactions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Transaction.getTransactions({ filterDto: req.query });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const { transaction } = yield Transaction.createTransaction({
                    userId,
                    body: req.body,
                });
                res.status(201).json({ message: "Transaction created.", payload: { transaction }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateTransactionStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionId = req.params.transactionId;
                const { transaction } = yield Transaction.updateTransactionStatus({
                    transactionId,
                    updateTransactionDto: req.body,
                });
                res.status(201).json({ message: "Transaction updated.", payload: { transaction }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    removeTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Transaction.removeTransaction({ transactionId: req.params.transactionId });
                res.status(200).json({ message: "Transaction deleted!.'", status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = TransactionController;
//# sourceMappingURL=transaction.controller.js.map