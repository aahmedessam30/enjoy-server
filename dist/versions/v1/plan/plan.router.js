"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plan_controller_1 = __importDefault(require("./plan.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const express_1 = require("express");
class PlanRouter {
    constructor() {
        this.planController = new plan_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", auth_old_1.isAdmin, this.validator("create"), validate_fields_1.default, this.planController.create);
        this.router.put("/:id", auth_old_1.isAdmin, this.validator("update"), validate_fields_1.default, this.planController.update);
        this.router.get("/dashboard", auth_old_1.isAdmin, this.validator("list"), validate_fields_1.default, this.planController.list);
        this.router.get("/dashboard/users", auth_old_1.isAdmin, this.validator("list"), validate_fields_1.default, this.planController.UsersPlanDashboard);
        this.router.get("/dashboard/user/:userId", auth_old_1.isAdmin, this.validator("userId"), validate_fields_1.default, this.planController.currentUserPlanDashboard);
        this.router.get("/dashboard/:id", auth_old_1.isAdmin, this.validator("one"), validate_fields_1.default, this.planController.findOne);
        this.router.delete("/:type/:id", auth_old_1.isAdmin, this.validator("deleteOrActive"), validate_fields_1.default, this.planController.deleteOrActive);
        this.router.post("/:type/:id", auth_old_1.isAdmin, this.validator("deleteOrActive"), validate_fields_1.default, this.planController.deleteOrActive);
        this.router.get("/user", auth_old_1.isAuth, this.planController.currentUserPlan);
        this.router.get("/checkUserPlan", auth_old_1.isAuth, this.planController.checkUserPlan);
        this.router.get("/", this.validator("list"), this.planController.listForUser);
        this.router.get("/:id", this.validator("one"), validate_fields_1.default, this.planController.findOneForUser);
    }
    validator(route) {
        if (route == "create") {
            return [
                (0, express_validator_1.body)("properties").optional({ checkFalsy: true }).isBoolean(),
                (0, express_validator_1.body)("refresh").optional({ checkFalsy: true }).isBoolean(),
                (0, express_validator_1.body)("nameAr").trim().notEmpty().isString(),
                (0, express_validator_1.body)("nameEn").trim().notEmpty().isString(),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.param)("id").trim().notEmpty().isUUID().withMessage("Plan id is not valid"),
                (0, express_validator_1.body)("properties").optional({ checkFalsy: true }).isBoolean(),
                (0, express_validator_1.body)("refresh").optional({ checkFalsy: true }).isBoolean(),
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
            return [
                (0, express_validator_1.param)("id").trim().notEmpty().isUUID().withMessage("Plan id is not valid"),
                (0, express_validator_1.param)("type").trim().notEmpty().isIn(["delete", "active", "inactive"]),
            ];
        }
        else if (route == "userId") {
            return [(0, express_validator_1.param)("userId").trim().notEmpty().isInt().withMessage("user id is not valid")];
        }
    }
}
exports.default = PlanRouter;
//# sourceMappingURL=plan.router.js.map