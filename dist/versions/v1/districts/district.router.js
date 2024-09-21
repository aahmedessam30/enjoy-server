"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const district_controller_1 = __importDefault(require("./district.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_1 = require("express");
class districtrouter {
    constructor() {
        this.districtController = new district_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/dashboard/districts/cities/:cityId", this.districtController.getCityDistricts);
        this.router.get("/dashboard/districts/:districtId", auth_old_1.isAdmin, this.districtController.getDistrict);
        this.router.get("/districts", this.districtController.getDistricts);
        this.router.post("/dashboard/districts", auth_old_1.isAuth, this.districtController.createDistrict);
        this.router.patch("/dashboard/districts/:districtId", auth_old_1.isAdmin, this.districtController.updateDistrict);
    }
    validator(route) { }
}
exports.default = districtrouter;
//# sourceMappingURL=district.router.js.map