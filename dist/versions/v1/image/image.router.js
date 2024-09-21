"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("./image.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class ImageRouter {
    constructor() {
        this.imageController = new image_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/images-module", auth_old_1.isAuth, this.validator("add"), validate_fields_1.default, this.imageController.add);
        this.router.post("/images/single", auth_old_1.isAuth, this.validator("addSingle"), validate_fields_1.default, this.imageController.addSingle);
        this.router.post("/admin/images/single", auth_old_1.isAdmin, this.validator("addSingle"), validate_fields_1.default, this.imageController.addSingle);
        this.router.delete("/images-module/:imageId", auth_old_1.isAuth, this.validator("remove"), validate_fields_1.default, this.imageController.remove);
    }
    validator(route) {
        if (route == "add") {
            return [
                (0, express_validator_1.body)("module").notEmpty().isIn(["Unit"]),
                (0, express_validator_1.body)("moduleId").trim().notEmpty().isUUID(),
                (0, express_validator_1.body)("images").notEmpty().isArray(),
                (0, express_validator_1.check)("images.*.type").notEmpty().isIn(["IMAGE", "VIDEO", "3D", "PDF"]),
                (0, express_validator_1.check)("images.*.url").notEmpty().isString(),
            ];
        }
        else if (route == "addSingle") {
            return [
                (0, express_validator_1.check)("type").notEmpty().isIn(["IMAGE", "VIDEO", "3D", "PDF"]),
                (0, express_validator_1.check)("url").notEmpty().isString(),
            ];
        }
        else if (route == "remove") {
            return [(0, express_validator_1.param)("imageId").trim().notEmpty().isUUID()];
        }
    }
}
exports.default = ImageRouter;
//# sourceMappingURL=image.router.js.map