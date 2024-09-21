"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_controller_1 = __importDefault(require("./checkout.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../../../middlewares/validate-fields");
class CheckoutRouter {
    constructor() {
        this.checkoutController = new checkout_controller_1.default();
        this.chains = {
            checkout: [
                (0, express_validator_1.param)("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
            ],
            create: [
                (0, express_validator_1.body)("promoId").optional().isString().withMessage("الكوبون غير صحيح"),
                (0, express_validator_1.body)("amount").trim().isDecimal().notEmpty().withMessage("entre valid amount value."),
                (0, express_validator_1.body)("total_amount").trim().isDecimal().notEmpty().withMessage("entre valid total amount"),
                (0, express_validator_1.body)("vatAmount").trim().isDecimal().notEmpty().withMessage("entre valid vat amount"),
                (0, express_validator_1.body)("promoAmount").trim().isDecimal().withMessage("entre valid vat amount"),
                (0, express_validator_1.body)("unitDiscountAmount").trim().isDecimal().withMessage("entre valid unit discount amount"),
                (0, express_validator_1.body)("checkIn").trim().isDate().notEmpty().withMessage("entre valid check in date."),
                (0, express_validator_1.body)("checkOut").trim().isDate().notEmpty().withMessage("entre valid check out date."),
                (0, express_validator_1.body)("nights").trim().isInt().notEmpty().withMessage("entre valid nights count."),
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("entre valid unit id."),
            ],
            accept: [
                (0, express_validator_1.param)("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
                (0, express_validator_1.param)("reservationId").trim().notEmpty().isUUID().withMessage("entre valid reservation id"),
                (0, express_validator_1.query)("authorization").trim().notEmpty().isJWT().withMessage("autherization not valid"),
            ],
            delete: [
                (0, express_validator_1.param)("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
                (0, express_validator_1.param)("reservationId").trim().notEmpty().isUUID().withMessage("entre valid reservation id"),
            ],
        };
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/checkout", auth_old_1.isAuth, (0, validate_fields_1.validate)(this.chains.create), this.checkoutController.createCheckout);
        this.router.get("/checkout/:chargeId/:reservationId/accept", auth_old_1.isQueryAuth, (0, validate_fields_1.validate)(this.chains.accept), this.checkoutController.acceptCheckout);
        this.router.get("/checkout/:chargeId", auth_old_1.isAuth, (0, validate_fields_1.validate)(this.chains.checkout), this.checkoutController.getOne);
        this.router.delete("/checkout/:chargeId/:reservationId/cancel", auth_old_1.isAuth, (0, validate_fields_1.validate)(this.chains.delete), this.checkoutController.cancelCheckout);
    }
}
exports.default = CheckoutRouter;
//# sourceMappingURL=checkout.router.js.map