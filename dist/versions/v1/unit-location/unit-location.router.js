"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const unit_location_controller_1 = __importDefault(require("./unit-location.controller"));
class UnitLocationRouter {
    constructor() {
        this.unitLocationController = new unit_location_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-locations/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitLocationController.get);
        this.router.post("/unit-locations", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitLocationController.createUnitLocation);
        this.router.patch("/unit-locations/units/:unitId", auth_old_1.isAuth, this.validator("update"), validate_fields_1.default, this.unitLocationController.update);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("districtId").trim().isUUID().withMessage("choose valid district of the unit."),
                (0, express_validator_1.body)("cityId").trim().isUUID().withMessage("choose valid city of the unit."),
                (0, express_validator_1.body)("location").isString(),
                (0, express_validator_1.body)("lat").trim().isDecimal().notEmpty().withMessage("entre valid lat number"),
                (0, express_validator_1.body)("lng").trim().isDecimal().notEmpty().withMessage("entre valid lng number"),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.param)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("districtId").isUUID().withMessage("choose valid district of the unit."),
                (0, express_validator_1.body)("cityId").trim().isUUID().withMessage("choose valid city of the unit."),
                (0, express_validator_1.body)("location").isString(),
                (0, express_validator_1.body)("lat").trim().isDecimal().notEmpty().withMessage("entre valid lat number"),
                (0, express_validator_1.body)("lng").trim().isDecimal().notEmpty().withMessage("entre valid lng number"),
            ];
        }
    }
}
exports.default = UnitLocationRouter;
//# sourceMappingURL=unit-location.router.js.map