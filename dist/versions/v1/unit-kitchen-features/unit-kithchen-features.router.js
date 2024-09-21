"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const unit_kitchen_features_controller_1 = __importDefault(require("./unit-kitchen-features.controller"));
class UnitKitchenFeatureRouter {
    constructor() {
        this.unitFeatureController = new unit_kitchen_features_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-kitchen-features/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitFeatureController.get);
        this.router.post("/unit-kitchen-features", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitFeatureController.addUnitKitchenFeatures);
        this.router.delete("/unit-kitchen-features/:unitKitchenFeatureId", auth_old_1.isAuth, this.validator("remove"), validate_fields_1.default, this.unitFeatureController.remove);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("kitchenFeatures").isArray(),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("unitKitchenFeatureId").trim().notEmpty().isUUID().withMessage("enter valid unit kitchen feature Id")];
        }
    }
}
exports.default = UnitKitchenFeatureRouter;
//# sourceMappingURL=unit-kithchen-features.router.js.map