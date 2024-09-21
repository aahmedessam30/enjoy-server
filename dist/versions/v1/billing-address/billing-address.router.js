"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const billing_address_controller_1 = __importDefault(require("./billing-address.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class BillingAddressRouter {
    constructor() {
        this.billingAddressController = new billing_address_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/billing-addresses", auth_old_1.isAuth, this.billingAddressController.getAddress);
        this.router.post("/billing-address", auth_old_1.isAuth, this.validator("post"), validate_fields_1.default, this.billingAddressController.createAdress);
    }
    validator(route) {
        if (route == "post") {
            return [
                (0, express_validator_1.body)("street1").trim().notEmpty().isString().withMessage("entre valid street1."),
                (0, express_validator_1.body)("street2").trim().isString(),
                (0, express_validator_1.body)("city").trim().isString().notEmpty().withMessage("entre valid city."),
                (0, express_validator_1.body)("state").trim().isString().notEmpty().withMessage("entre valid state."),
                (0, express_validator_1.body)("customerId").trim().isUUID().notEmpty().withMessage("entre valid customer id."),
                (0, express_validator_1.body)("postcode").trim().isString().notEmpty().withMessage("entre valid postcode."),
            ];
        }
    }
}
exports.default = BillingAddressRouter;
//# sourceMappingURL=billing-address.router.js.map