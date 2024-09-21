"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const info_controller_1 = __importDefault(require("./info.controller"));
class inforouter {
    constructor() {
        this.infoController = new info_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", auth_old_1.isAdmin, this.validator("create"), validate_fields_1.default, this.infoController.create);
        this.router.put("/:infoId", auth_old_1.isAdmin, this.validator("update"), validate_fields_1.default, this.infoController.update);
        this.router.get("/", auth_old_1.isAdmin, this.validator("list"), validate_fields_1.default, this.infoController.list);
        this.router.get("/options", this.infoController.getInfo);
    }
    validator(route) {
        if (route == "create") {
            return [(0, express_validator_1.body)("key").trim().notEmpty().isString(), (0, express_validator_1.body)("value").trim().notEmpty().isString()];
        }
        else if (route == "update") {
            return [(0, express_validator_1.param)("infoId").trim().isInt().notEmpty(), (0, express_validator_1.body)("value").trim().notEmpty().isString()];
        }
        else if (route == "list") {
            return [
                (0, express_validator_1.query)("page").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("page").default(1),
                (0, express_validator_1.query)("limit").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("limit").default(10),
            ];
        }
    }
}
exports.default = inforouter;
//# sourceMappingURL=info.router.js.map