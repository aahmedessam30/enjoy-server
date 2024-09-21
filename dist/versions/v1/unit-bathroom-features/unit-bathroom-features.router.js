"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const unit_bathroom_features_controller_1 = __importDefault(require("./unit-bathroom-features.controller"));
class UnitBathroomFeatureRouter {
    constructor() {
        this.unitFeatureController = new unit_bathroom_features_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-bathroom-features/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitFeatureController.get);
        this.router.post("/unit-bathroom-features", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitFeatureController.addUnitBathroomFeatures);
        this.router.delete("/unit-bathroom-features/:unitBathroomFeatureId", auth_old_1.isAuth, this.validator("remove"), validate_fields_1.default, this.unitFeatureController.remove);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("bathroomFeatures").isArray(),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("unitBathroomFeatureId").trim().notEmpty().isUUID().withMessage("enter valid unit kitchen feature Id")];
        }
    }
}
exports.default = UnitBathroomFeatureRouter;
//# sourceMappingURL=unit-bathroom-features.router.js.map