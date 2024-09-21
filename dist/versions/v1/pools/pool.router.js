"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const pool_controller_1 = __importDefault(require("./pool.controller"));
class PoolRouter {
    constructor() {
        this.poolController = new pool_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/pools", validate_fields_1.default, this.poolController.getPools);
        this.router.get("/pools/:poolId", this.validator("id"), validate_fields_1.default, this.poolController.getOne);
        this.router.get("/dashboard/pools", auth_old_1.isAdmin, validate_fields_1.default, this.poolController.adminGetPools);
        this.router.post("/dashboard/pools", auth_old_1.isAdmin, this.validator('create'), validate_fields_1.default, this.poolController.create);
        this.router.patch("/dashboard/pools/:poolId", auth_old_1.isAdmin, this.validator("id"), validate_fields_1.default, this.poolController.update);
        this.router.delete("/dashboard/pools/:poolId", auth_old_1.isAdmin, this.validator("id"), validate_fields_1.default, this.poolController.remove);
    }
    validator(route) {
        if (route == "id") {
            return [
                (0, express_validator_1.param)("poolId").trim().isUUID().notEmpty(),
            ];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("nameAr").trim().isString().notEmpty(),
                (0, express_validator_1.body)("nameEn").trim().isString().notEmpty(),
            ];
        }
    }
}
exports.default = PoolRouter;
//# sourceMappingURL=pool.router.js.map