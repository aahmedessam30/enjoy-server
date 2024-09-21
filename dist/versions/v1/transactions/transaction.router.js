"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("./transaction.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../../../middlewares/validate-fields");
class transactionRouter {
    constructor() {
        this.transactionController = new transaction_controller_1.default();
        this.chains = {
            create: [
                (0, express_validator_1.body)("promoId").optional().isUUID().withMessage("رمز الكوبون غير صحيح"),
                (0, express_validator_1.body)("amount").trim().isDecimal().notEmpty().withMessage("entre valid amount value."),
                (0, express_validator_1.body)("amountAfterDiscount").trim().isDecimal().notEmpty().withMessage("entre valid amount after discount value."),
            ],
        };
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/transactions/:transactionId", auth_old_1.isAdmin, this.transactionController.getTransaction);
        this.router.get("/dashboard/transactions", auth_old_1.isAdmin, this.transactionController.getTransactions);
        this.router.post("/transaction", auth_old_1.isAuth, (0, validate_fields_1.validate)(this.chains.create), this.transactionController.createTransaction);
        this.router.patch("/transactions/:transactionId/status", auth_old_1.isAdmin, this.transactionController.updateTransactionStatus);
        this.router.delete("/transactions/:transactionId", auth_old_1.isAdmin, this.transactionController.removeTransaction);
    }
}
exports.default = transactionRouter;
//# sourceMappingURL=transaction.router.js.map