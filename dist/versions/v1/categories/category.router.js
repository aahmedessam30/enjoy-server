"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const category_controller_1 = __importDefault(require("./category.controller"));
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class categoryrouter {
    constructor() {
        this.categoryController = new category_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/dashboard/categories/:categoryId", auth_old_1.isAdmin, this.validator("id"), validate_fields_1.default, this.categoryController.getCategory);
        this.router.get("/categories", this.categoryController.getCategories);
        this.router.get("/categories-filters", this.categoryController.getCategoriesWithFilters);
        this.router.get("/dashboard/categories", auth_old_1.isAdmin, this.categoryController.getDashboardCategories);
        this.router.post("/dashboard/categories", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.categoryController.createCategory);
        this.router.patch("/dashboard/categories/:categoryId", auth_old_1.isAdmin, this.validator("update"), validate_fields_1.default, this.categoryController.updateCategory);
        this.router.post("/dashboard/categories/:categoryId", auth_old_1.isAdmin, this.validator("status"), validate_fields_1.default, this.categoryController.updateCategoryStatus);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("categoryId").notEmpty().isUUID()];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("nameAr").trim().isString().notEmpty().withMessage("name ar is required"),
                (0, express_validator_1.body)("nameEn").trim().isString().notEmpty().withMessage("name en is required."),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.param)("categoryId").notEmpty().isUUID(),
                (0, express_validator_1.body)("nameAr").optional({ checkFalsy: true }).isString(),
                (0, express_validator_1.body)("nameEn").optional({ checkFalsy: true }).isString(),
            ];
        }
        else if (route == "status") {
            return [(0, express_validator_1.param)("categoryId").trim().isUUID().notEmpty(), (0, express_validator_1.body)("status").isString().notEmpty().withMessage("entre valid status.")];
        }
    }
}
exports.default = categoryrouter;
//# sourceMappingURL=category.router.js.map