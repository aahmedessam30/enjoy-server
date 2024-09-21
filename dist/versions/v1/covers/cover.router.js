"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const cover_controller_1 = __importDefault(require("./cover.controller"));
class CoverRouter {
    constructor() {
        this.coverController = new cover_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/covers", validate_fields_1.default, this.coverController.get);
        this.router.post("/covers", auth_old_1.isAdmin, this.validator("create"), validate_fields_1.default, this.coverController.create);
        this.router.delete("/covers/:coverId", auth_old_1.isAdmin, this.validator("remove"), validate_fields_1.default, this.coverController.remove);
    }
    validator(route) {
        if (route == "create") {
            return [
                (0, express_validator_1.body)("imageId").trim().isUUID().notEmpty().withMessage("enter valid image Id"),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("coverId").trim().notEmpty().isUUID().withMessage("enter valid cover Id")];
        }
    }
}
exports.default = CoverRouter;
//# sourceMappingURL=cover.router.js.map