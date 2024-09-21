"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const plan_transaction_controller_1 = __importDefault(require("./plan-transaction.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const express_1 = require("express");
class PlanTransactionRouter {
    constructor() {
        this.planTransactionController = new plan_transaction_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/createTransaction", auth_old_1.isAuth, this.validator("createPlanTransaction"), validate_fields_1.default, this.planTransactionController.createPlanTransaction);
        this.router.post("/createInvoice", auth_old_1.isAuth, this.validator("createPlanInvoice"), validate_fields_1.default, this.planTransactionController.createPlanInvoice);
    }
    validator(route) {
        if (route == "createPlanTransaction") {
            return [
                (0, express_validator_1.body)("planPeriodId").trim().notEmpty().isUUID().withMessage("Plan period id is not valid"),
                (0, express_validator_1.body)("amount").trim().isString().notEmpty().withMessage("entre valid amount value."),
            ];
        }
        else if (route == "createPlanInvoice") {
            return [(0, express_validator_1.body)("transactionId").trim().notEmpty().isUUID().withMessage("entre valid transaction id")];
        }
    }
}
exports.default = PlanTransactionRouter;
//# sourceMappingURL=plan-transaction.router.js.map