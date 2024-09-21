"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_controller_1 = __importDefault(require("./invoice.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const express_1 = require("express");
class InvocieRouter {
    constructor() {
        this.invocieController = new invoice_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/invoices/:invoiceId", auth_old_1.isAuth, this.invocieController.getInvocie);
        this.router.get("/invoices", auth_old_1.isAuth, this.invocieController.getInvocies);
        this.router.get("/dashboard/invoices", auth_old_1.isAdmin, this.invocieController.getDashboardInvoices);
        this.router.post("/invoices", auth_old_1.isAuth, [
            (0, express_validator_1.body)("total").trim().isDecimal().notEmpty().withMessage("entre valid total value."),
            (0, express_validator_1.body)("transactionId").trim().isUUID().notEmpty().withMessage("entre valid transaction id."),
        ], this.invocieController.createInvocie);
    }
    validator(route) { }
}
exports.default = InvocieRouter;
//# sourceMappingURL=invoice.router.js.map