"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plan_period_controller_1 = __importDefault(require("./plan-period.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class PlanPreiodRouter {
    constructor() {
        this.planPreiodController = new plan_period_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", auth_old_1.isAdmin, this.validator("create"), validate_fields_1.default, this.planPreiodController.create);
        this.router.put("/:id", auth_old_1.isAdmin, this.validator("update"), validate_fields_1.default, this.planPreiodController.update);
        this.router.get("/dashboard", auth_old_1.isAdmin, this.validator("list"), validate_fields_1.default, this.planPreiodController.list);
        this.router.get("/dashboard/:id", auth_old_1.isAdmin, this.validator("one"), validate_fields_1.default, this.planPreiodController.findOne);
        this.router.delete("/:type/:id", auth_old_1.isAdmin, this.validator("deleteOrActive"), validate_fields_1.default, this.planPreiodController.deleteOrActive);
        this.router.post("/:type/:id", auth_old_1.isAdmin, this.validator("deleteOrActive"), validate_fields_1.default, this.planPreiodController.deleteOrActive);
    }
    validator(route) {
        if (route == "create") {
            return [
                (0, express_validator_1.body)("price").notEmpty().isDecimal(),
                (0, express_validator_1.body)("discount").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.body)("periodByMonth").notEmpty().isDecimal(),
                (0, express_validator_1.body)("planId").trim().notEmpty().isUUID().withMessage("Plan id is not valid"),
                (0, express_validator_1.body)("nameAr").trim().notEmpty().isString(),
                (0, express_validator_1.body)("nameEn").trim().notEmpty().isString(),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.param)("id").trim().notEmpty().isUUID().withMessage("period id is not valid"),
                (0, express_validator_1.body)("price").optional({ checkFalsy: true }).isDecimal(),
                (0, express_validator_1.body)("discount").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.body)("periodByMonth").optional({ checkFalsy: true }).isDecimal(),
                (0, express_validator_1.body)("nameAr").trim().notEmpty().isString(),
                (0, express_validator_1.body)("nameEn").trim().notEmpty().isString(),
            ];
        }
        else if (route == "one") {
            return [(0, express_validator_1.param)("id").trim().notEmpty().isUUID().withMessage("Plan id is not valid")];
        }
        else if (route == "list") {
            return [
                (0, express_validator_1.query)("page").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("page").default(1),
                (0, express_validator_1.query)("limit").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("limit").default(10),
            ];
        }
        else if (route == "deleteOrActive") {
            return [(0, express_validator_1.param)("id").trim().notEmpty().isUUID().withMessage("Plan id is not valid"), (0, express_validator_1.param)("type").trim().notEmpty().isIn(["delete", "active"])];
        }
    }
}
exports.default = PlanPreiodRouter;
//# sourceMappingURL=plan-period.router.js.map