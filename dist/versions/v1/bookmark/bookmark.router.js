"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmark_controller_1 = __importDefault(require("./bookmark.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class BookmarkRouter {
    constructor() {
        this.bookmarkController = new bookmark_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/unit-bookmarks", auth_old_1.isAuth, this.validator("list"), validate_fields_1.default, this.bookmarkController.list);
        this.router.post("/unit-bookmarks", auth_old_1.isAuth, this.validator("add"), validate_fields_1.default, this.bookmarkController.add);
        this.router.delete("/unit-bookmarks/:bookmarkId", auth_old_1.isAuth, this.validator("remove"), validate_fields_1.default, this.bookmarkController.remove);
    }
    validator(route) {
        if (route == "add") {
            return [
                (0, express_validator_1.body)("unitId")
                    .trim()
                    .notEmpty()
                    .isUUID().withMessage('Enter valid unit id'),
            ];
        }
        else if (route == "list") {
            return [
                (0, express_validator_1.query)("page").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("page").default(1),
                (0, express_validator_1.query)("limit").optional({ checkFalsy: true }).isInt(),
                (0, express_validator_1.query)("limit").default(15),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("bookmarkId").trim().notEmpty().isUUID()];
        }
    }
}
exports.default = BookmarkRouter;
//# sourceMappingURL=bookmark.router.js.map