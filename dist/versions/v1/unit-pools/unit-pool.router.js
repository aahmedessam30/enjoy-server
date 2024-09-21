"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const unit_pool_controller_1 = __importDefault(require("./unit-pool.controller"));
class UnitPoolRouter {
    constructor() {
        this.unitPoolController = new unit_pool_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-pools/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitPoolController.get);
        this.router.post("/unit-pools", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitPoolController.create);
        this.router.delete("/unit-pools/:unitPoolId", auth_old_1.isAuth, this.validator("remove"), validate_fields_1.default, this.unitPoolController.remove);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("poolId").trim().isUUID().notEmpty().withMessage("enter valid pool Id"),
                (0, express_validator_1.body)("length").trim().notEmpty().isInt().withMessage("enter valid length"),
                (0, express_validator_1.body)("height").trim().notEmpty().isInt().withMessage("enter valid height"),
                (0, express_validator_1.body)("width").trim().notEmpty().isInt().withMessage("enter valid width"),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("unitBathroomFeatureId").trim().notEmpty().isUUID().withMessage("enter valid unit kitchen feature Id")];
        }
    }
}
exports.default = UnitPoolRouter;
//# sourceMappingURL=unit-pool.router.js.map