"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const feature_controller_1 = __importDefault(require("./feature.controller"));
class FeatureRouter {
    constructor() {
        this.featureController = new feature_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/features/types/:featureType", validate_fields_1.default, this.featureController.getFeaturesByType);
        this.router.get("/features", validate_fields_1.default, this.featureController.getFeatures);
        this.router.get("/features/:featureId", this.validator("id"), validate_fields_1.default, this.featureController.getOne);
        this.router.get("/dashboard/features", validate_fields_1.default, this.featureController.adminGetFeatures);
        this.router.post("/dashboard/features", auth_old_1.isAdmin, validate_fields_1.default, this.featureController.createFeature);
        this.router.patch("/dashboard/features/:featureId", auth_old_1.isAdmin, this.validator("id"), validate_fields_1.default, this.featureController.updateFeature);
        this.router.delete("/dashboard/features/:featureId", auth_old_1.isAdmin, this.validator("id"), validate_fields_1.default, this.featureController.removeFeature);
    }
    validator(route) {
        if (route == "id") {
            return [
                (0, express_validator_1.param)("featureId").trim().isUUID().notEmpty(),
            ];
        }
    }
}
exports.default = FeatureRouter;
//# sourceMappingURL=feature.router.js.map