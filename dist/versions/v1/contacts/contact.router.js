"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = __importDefault(require("./contact.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class ContactRouter {
    constructor() {
        this.contactController = new contact_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", auth_old_1.isAdmin, this.contactController.list);
        this.router.post("/", this.validator("create"), validate_fields_1.default, this.contactController.create);
        this.router.delete("/", auth_old_1.isAdmin, this.contactController.remove);
    }
    validator(route) {
        if (route == "create") {
            return [
                (0, express_validator_1.body)("mobile").trim().isMobilePhone('any').withMessage("entre valid mobile."),
                (0, express_validator_1.body)("message").trim().optional().isString().withMessage("entre valid message."),
                (0, express_validator_1.body)("email").trim().optional().isEmail().withMessage("entre valid email."),
                (0, express_validator_1.body)("name").trim().isString().withMessage("entre valid name."),
            ];
        }
    }
}
exports.default = ContactRouter;
//# sourceMappingURL=contact.router.js.map