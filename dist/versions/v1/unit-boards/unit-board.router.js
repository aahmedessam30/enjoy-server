"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const unit_board_controller_1 = __importDefault(require("./unit-board.controller"));
class UnitBoardRouter {
    constructor() {
        this.unitBoardController = new unit_board_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-boards/units/:unitId", auth_old_1.isAuth, this.validator("id"), validate_fields_1.default, this.unitBoardController.getAll);
        this.router.post("/unit-boards", auth_old_1.isAuth, this.validator("create"), validate_fields_1.default, this.unitBoardController.create);
        this.router.patch("/unit-boards/units/:unitBoardId", auth_old_1.isAuth, this.validator("update"), validate_fields_1.default, this.unitBoardController.update);
    }
    validator(route) {
        if (route == "id") {
            return [(0, express_validator_1.param)("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")];
        }
        else if (route == "create") {
            return [
                (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
                (0, express_validator_1.body)("description").trim().isString().notEmpty().withMessage("entre valid description"),
            ];
        }
        else if (route == "update") {
            return [
                (0, express_validator_1.param)("unitBoardId").trim().isUUID().notEmpty().withMessage("enter valid unit bedroom Id"),
                (0, express_validator_1.body)("description").trim().isString().notEmpty().withMessage("entre valid roomCount number"),
            ];
        }
    }
}
exports.default = UnitBoardRouter;
//# sourceMappingURL=unit-board.router.js.map