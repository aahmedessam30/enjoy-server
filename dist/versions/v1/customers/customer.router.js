"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = __importDefault(require("./customer.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class CustomerRouter {
    constructor() {
        this.customerController = new customer_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/customers", auth_old_1.isAuth, this.customerController.getCustomer);
        this.router.post("/customers", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.customerController.createCustomer);
        this.router.put("/customers", auth_old_1.isAuth, this.validator("update"), validate_fields_1.default, this.customerController.update);
    }
    validator(route) {
        if (route == "create") {
            return [
                (0, express_validator_1.body)("givenName").trim().isString().notEmpty().withMessage("entre valid given name"),
                (0, express_validator_1.body)("surname").trim().notEmpty().isString().withMessage("entre valid surname."),
                (0, express_validator_1.body)("email").trim().notEmpty().normalizeEmail().withMessage("entre valid email."),
                (0, express_validator_1.body)("nationalId").trim().notEmpty().isString().withMessage("entre valid nationalId"),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.body)("givenName").trim().optional({ checkFalsy: true }).isString().withMessage("entre valid given name"),
                (0, express_validator_1.body)("surname").trim().optional({ checkFalsy: true }).isString().withMessage("entre valid surname."),
                (0, express_validator_1.body)("email").trim().optional({ checkFalsy: true }).isEmail().withMessage("entre valid email."),
                (0, express_validator_1.body)("nationalId").trim().optional({ checkFalsy: true }).isString().withMessage("entre valid nationalId"),
            ];
        }
    }
}
exports.default = CustomerRouter;
//# sourceMappingURL=customer.router.js.map