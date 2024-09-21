"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const unit_bedroom_controller_1 = __importDefault(require("./unit-bedroom.controller"));
class UnitBedroomRouter {
    constructor() {
        this.unitBedroomController = new unit_bedroom_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-bedrooms/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitBedroomController.getOne);
        this.router.post("/unit-bedrooms", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitBedroomController.create);
        this.router.patch("/unit-bedrooms/units/:unitBedroomId", auth_old_1.isAuth, this.validator("update"), validate_fields_1.default, this.unitBedroomController.update);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("roomCount").trim().isInt().notEmpty().withMessage("entre valid roomCount number"),
                (0, express_validator_1.body)("singleBedCount").trim().isInt().notEmpty().withMessage("entre valid singleBedCount number"),
                (0, express_validator_1.body)("masterBedCount").trim().isInt().notEmpty().withMessage("entre valid masterBedCount number"),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.param)("unitBedroomId").trim().isUUID().notEmpty().withMessage("enter valid unit bedroom Id"),
                (0, express_validator_1.body)("roomCount").trim().isInt().notEmpty().withMessage("entre valid roomCount number"),
                (0, express_validator_1.body)("singleBedCount").trim().isInt().notEmpty().withMessage("entre valid singleBedCount number"),
                (0, express_validator_1.body)("masterBedCount").trim().isInt().notEmpty().withMessage("entre valid masterBedCount number"),
            ];
        }
    }
}
exports.default = UnitBedroomRouter;
//# sourceMappingURL=unit-bedroom.router.js.map