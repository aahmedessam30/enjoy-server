"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promo_code_controller_1 = __importDefault(require("./promo-code.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class PromoCodeRouter {
    constructor() {
        this.promoCode = new promo_code_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/promo-codes/:code", auth_old_1.isAuth, this.validator("verify"), validate_fields_1.default, this.promoCode.verifyPomoCode);
        this.router.post("/dashboard/promo-codes", auth_old_1.isAdmin, this.validator("create"), validate_fields_1.default, this.promoCode.createPromoCode);
        this.router.get("/promo/dashboard", auth_old_1.isAdmin, this.validator("list"), validate_fields_1.default, this.promoCode.list);
        this.router.get("/dashboard/promo/search", auth_old_1.isAdmin, this.promoCode.search);
        this.router.get("/promo/dashboard/:promoId", auth_old_1.isAdmin, this.validator("findOne"), validate_fields_1.default, this.promoCode.findOne);
    }
    validator(route) {
        if (route == "verify") {
            return [
                (0, express_validator_1.param)("code").trim().notEmpty().withMessage("رمز الكوبون غير صحيح").isString().withMessage("رمز الكوبون غير صحيح"),
                (0, express_validator_1.query)("type").trim().notEmpty().isIn(["UNITS"]).withMessage("entre valid code type"),
            ];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("code").trim().notEmpty().isString().withMessage("entre valid code"),
                (0, express_validator_1.body)("discount").trim().notEmpty().isNumeric().withMessage("entre valid discount"),
                (0, express_validator_1.body)("expireDate").optional({ checkFalsy: true }).isISO8601().toDate(),
                (0, express_validator_1.body)("type").trim().notEmpty().isIn(["UNITS"]).withMessage("entre valid code type"),
            ];
        }
        else if (route == "list") {
            return [
                (0, express_validator_1.query)("page").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("page").default(1),
                (0, express_validator_1.query)("limit").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("limit").default(10),
            ];
        }
        else if (route == "findOne") {
            return [(0, express_validator_1.param)("promoId").trim().notEmpty().isUUID()];
        }
    }
}
exports.default = PromoCodeRouter;
//# sourceMappingURL=promo-code.router.js.map