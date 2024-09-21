"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const rated_city_controller_1 = __importDefault(require("./rated-city.controller"));
class RatedCityRouter {
    constructor() {
        this.ratedCityController = new rated_city_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/dashboard/rated-cities", validate_fields_1.default, this.ratedCityController.adminGet);
        this.router.get("/rated-cities", validate_fields_1.default, this.ratedCityController.get);
        this.router.post("/rated-cities", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.ratedCityController.create);
        this.router.delete("/rated-cities/:ratedCitiyId", auth_old_1.isAuth, this.validator("remove"), validate_fields_1.default, this.ratedCityController.remove);
    }
    validator(route) {
        if (route == "create") {
            return [
                (0, express_validator_1.body)("cityId").trim().isUUID().notEmpty().withMessage("enter valid city Id"),
                (0, express_validator_1.body)("imageId").trim().isUUID().notEmpty().withMessage("enter valid image Id"),
                (0, express_validator_1.body)("rate").trim().notEmpty().isFloat().withMessage("enter valid rate"),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("ratedCitiyId").trim().notEmpty().isUUID().withMessage("enter valid rated city Id")];
        }
    }
}
exports.default = RatedCityRouter;
//# sourceMappingURL=rated-city.router.js.map