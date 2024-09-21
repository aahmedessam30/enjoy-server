"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const charge_controller_1 = __importDefault(require("./charge.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../../../middlewares/validate-fields");
class ChargeRouter {
    constructor() {
        this.chargeController = new charge_controller_1.default();
        this.chains = {
            create: [
                (0, express_validator_1.body)("promoId").optional().isUUID().withMessage("رمز الكوبون غير صحيح"),
                (0, express_validator_1.body)("amount").trim().isDecimal().notEmpty().withMessage("entre valid amount value."),
                (0, express_validator_1.body)("total_amount").trim().isDecimal().notEmpty().withMessage("entre valid amount after discount value."),
            ],
        };
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/charges/:chargeId", auth_old_1.isAdmin, this.chargeController.getCharge);
        this.router.get("/dashboard/charges", auth_old_1.isAdmin, this.chargeController.getCharges);
        this.router.post("/charges", auth_old_1.isAuth, (0, validate_fields_1.validate)(this.chains.create), this.chargeController.createCharge);
        this.router.patch("/charges/:chargeId/status", auth_old_1.isAdmin, this.chargeController.updateChargeStatus);
        this.router.delete("/charges/:chargeId", auth_old_1.isAdmin, this.chargeController.cancelCharge);
    }
}
exports.default = ChargeRouter;
//# sourceMappingURL=charge.router.js.map