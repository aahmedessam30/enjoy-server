"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const unit_controller_1 = __importDefault(require("./unit.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class UnitRouter {
    constructor() {
        this.unitController = new unit_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/units/list", this.validator("list"), validate_fields_1.default, this.unitController.list);
        this.router.get("/units/host", auth_old_1.isHostAuth, this.unitController.getOwnUnits);
        this.router.get("/units/archives", auth_old_1.isHostAuth, this.validator("page"), validate_fields_1.default, this.unitController.getArchiveUnits);
        this.router.post("/units", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitController.createUnit);
        this.router.get("/units/check-unit-available/:unitId", auth_old_1.isAuth, this.validator("check-available"), validate_fields_1.default, this.unitController.checkUnitAvailable);
        this.router.patch("/units/:unitId", auth_old_1.isAuth, this.validator("update"), validate_fields_1.default, this.unitController.updateUnit);
        this.router.post("/units/archive/:unitId", auth_old_1.isAuth, this.unitController.archiveUnit);
        this.router.get("/admin/units/hosts/:hostId", auth_old_1.isAdmin, this.validator("hostId"), validate_fields_1.default, this.unitController.getHostUnits);
        this.router.get("/admin/units/:unitId", auth_old_1.isAdmin, this.validator("id"), validate_fields_1.default, this.unitController.getUnit);
        this.router.get("/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitController.getUnit);
        this.router.post("/admin/units", auth_old_1.isAdmin, this.validator("adminCreate"), validate_fields_1.default, this.unitController.createUnit);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("unit id not valid")];
        }
        else if (route == "hostId") {
            return [(0, express_validator_1.param)("hostId").trim().notEmpty().isUUID().withMessage("host id not valid")];
        }
        else if (route == "check-available") {
            return [
                (0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("unit id is not valid"),
                (0, express_validator_1.query)("checkIn").trim().notEmpty().isString().withMessage("check in is not valid"),
                (0, express_validator_1.query)("checkOut").trim().notEmpty().isString().withMessage("check out is not valid")
            ];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("categoryId").trim().notEmpty().isUUID().withMessage("should select category of the unit"),
                (0, express_validator_1.body)("space").trim().isString().notEmpty().withMessage("entre valid space."),
                (0, express_validator_1.body)("details").trim().isString().notEmpty().withMessage("entre valid description of the unit."),
                (0, express_validator_1.body)("platform").isString(),
                (0, express_validator_1.body)("appVersion").isString(),
                (0, express_validator_1.body)("priceByDay").trim().isDecimal().withMessage("entre valid price of the unit."),
            ];
        }
        else if (route == "adminCreate") {
            return [
                (0, express_validator_1.body)("categoryId").trim().notEmpty().isUUID().withMessage("should select category of the unit"),
                (0, express_validator_1.body)("userId").trim().notEmpty().isUUID().withMessage("host id not found"),
                (0, express_validator_1.body)("space").trim().isString().notEmpty().withMessage("entre valid space."),
                (0, express_validator_1.body)("details").trim().isString().notEmpty().withMessage("entre valid description of the unit."),
                (0, express_validator_1.body)("platform").isString(),
                (0, express_validator_1.body)("appVersion").isString(),
                (0, express_validator_1.body)("priceByDay").trim().isDecimal().withMessage("entre valid price of the unit."),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.body)("space").trim().optional().isString().withMessage("entre valid space."),
                (0, express_validator_1.body)("details").trim().optional().isString().withMessage("entre valid description of the unit."),
                (0, express_validator_1.body)("appVersion").optional().isString(),
                (0, express_validator_1.body)("priceByDay").optional().isDecimal().withMessage("entre valid price of the unit."),
            ];
        }
        else if (route == "list") {
            return [
                (0, express_validator_1.query)("currentPage").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("currentPage").default(1),
                (0, express_validator_1.query)("perPage").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("perPage").default(25),
                (0, express_validator_1.query)("categoryId").optional({ checkFalsy: true }).isUUID(),
                (0, express_validator_1.query)("minPrice").optional({ checkFalsy: true }).isDecimal(),
                (0, express_validator_1.query)("maxPrice").optional({ checkFalsy: true }).isDecimal(),
                (0, express_validator_1.query)("cityId").optional({ checkFalsy: true }).isUUID(),
                (0, express_validator_1.query)("regionId").optional({ checkFalsy: true }).isUUID(),
                (0, express_validator_1.query)("lng").optional({ checkFalsy: true }).isDecimal(),
                (0, express_validator_1.query)("lat").optional({ checkFalsy: true }).isDecimal(),
            ];
        }
        else if (route == "page") {
            return [
                (0, express_validator_1.query)("currentPage").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("currentPage").default(1),
                (0, express_validator_1.query)("perPage").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("perPage").default(25),
            ];
        }
        else if (route == "pagination") {
            return [
                (0, express_validator_1.query)("page").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("page").default(1),
                (0, express_validator_1.query)("limit").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("limit").default(10),
            ];
        }
    }
}
exports.default = UnitRouter;
//# sourceMappingURL=unit.router.js.map