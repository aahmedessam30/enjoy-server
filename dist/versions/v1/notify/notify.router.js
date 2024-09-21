"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const notify_controller_1 = __importDefault(require("./notify.controller"));
class NotifyRouter {
    constructor() {
        this.notifyController = new notify_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/all", auth_old_1.isAdmin, this.validator("all"), validate_fields_1.default, this.notifyController.sendNotifyToAll);
        this.router.post("/user/:userId", auth_old_1.isAdmin, this.validator("user"), validate_fields_1.default, this.notifyController.sendNotifyToUser);
    }
    validator(route) {
        if (route == "all") {
            return [(0, express_validator_1.body)("title").trim().notEmpty().isString(), (0, express_validator_1.body)("message").trim().notEmpty().isString()];
        }
        else if (route == "user") {
            return [(0, express_validator_1.param)("userId").trim().notEmpty().isInt().withMessage("user id is not valid"), (0, express_validator_1.body)("message").trim().notEmpty().isString()];
        }
    }
}
exports.default = NotifyRouter;
//# sourceMappingURL=notify.router.js.map