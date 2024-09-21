"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const property_dash_controller_1 = __importDefault(require("./property-dash.controller"));
const auth_old_1 = require("../../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../../middlewares/validate-fields"));
class propDashboardrouter {
    constructor() {
        this.propDashcontroller = new property_dash_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/list", auth_old_1.isAdmin, this.validator("page"), validate_fields_1.default, this.propDashcontroller.getDashboardProperties);
        this.router.get("/propertyStats", auth_old_1.isAdmin, this.propDashcontroller.getPropertiesStats);
        this.router.post("/changeStatus/:propertyId", auth_old_1.isAdmin, this.validator("changeStatus"), validate_fields_1.default, this.propDashcontroller.changeStatus);
        this.router.post("/", auth_old_1.isAdmin, this.validator("create"), validate_fields_1.default, this.propDashcontroller.createProperty);
        this.router.get("/multi-count", auth_old_1.isAdmin, this.propDashcontroller.multiCount);
    }
    validator(route) {
        if (route == "changeStatus") {
            return [
                (0, express_validator_1.param)("propertyId").trim().isInt().notEmpty().withMessage("property id not valid"),
                (0, express_validator_1.body)("type").trim().notEmpty().isIn(["ACTIVE", "UNDER_REVIEW", "ARCHIVE"]),
            ];
        }
        else if (route == "page") {
            return [
                (0, express_validator_1.query)("currentPage").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("currentPage").default(1),
                (0, express_validator_1.query)("perPage").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("perPage").default(25),
                (0, express_validator_1.query)("countryId").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("countryId").default(1),
            ];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("userId").trim().isInt().notEmpty().withMessage("should select user of the ad"),
                (0, express_validator_1.body)("categoryId").trim().isInt().notEmpty().withMessage("should select category of the ad"),
                (0, express_validator_1.body)("space").trim().isString().notEmpty().withMessage("entre valid space."),
                (0, express_validator_1.body)("details").trim().isString().notEmpty().withMessage("entre valid description of the property."),
                (0, express_validator_1.body)("location").isString().notEmpty().withMessage("choose address of the property."),
                (0, express_validator_1.body)("platform").isString(),
                (0, express_validator_1.body)("appVersion").isString(),
                (0, express_validator_1.body)("price").trim().isDecimal().withMessage("entre valid price of the property."),
                (0, express_validator_1.body)("userRegistrationNumber").trim().isString(),
                (0, express_validator_1.body)("userAuthorizationNumber").trim().isString(),
                (0, express_validator_1.body)("userAuthorizeType").trim().isIn(["DIGITAL", "WRITTEN"]),
                (0, express_validator_1.body)("selects").isArray(),
                (0, express_validator_1.body)("inputs").isArray(),
                (0, express_validator_1.body)("images").isArray(),
                (0, express_validator_1.body)("features").isArray(),
                (0, express_validator_1.body)("propertyOwnerType").isIn(["Owner", "Agent", "Broker"]),
                (0, express_validator_1.body)("landNumber").isString(),
                (0, express_validator_1.body)("planNumber").isString(),
                (0, express_validator_1.body)("licenceNo").isString(),
                (0, express_validator_1.body)("usingFor").isIn(["RESIDENTIAL", "COMMERCIAL"]).notEmpty().withMessage("entre valid using type of the property"),
                (0, express_validator_1.body)("subType").isIn(["SELL", "RENTAL", "INVESTMENT"]).notEmpty().withMessage("entre valid type of the property"),
                (0, express_validator_1.body)("rentPaymentType").optional().isIn(["MONTHLY", "QUARTERLY", "BIANNUAL", "ANNUAL"]),
            ];
        }
    }
}
exports.default = propDashboardrouter;
//# sourceMappingURL=property-dash.router.js.map