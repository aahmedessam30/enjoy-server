"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const city_controller_1 = __importDefault(require("./city.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
class cityrouter {
    constructor() {
        this.cityController = new city_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/dashboard/cities/:cityId", auth_old_1.isAdmin, this.cityController.getCity);
        this.router.get("/cities", this.cityController.getCities);
        this.router.get("/dashboard/cities", auth_old_1.isAdmin, this.cityController.getDashboardCities);
        this.router.post("/dashboard/cities", auth_old_1.isAuth, this.cityController.createCity);
        this.router.post("/dashboard/cities", this.cityController.createCity);
        this.router.patch("/dashboard/cities/:cityId", auth_old_1.isAdmin, this.cityController.updateCity);
    }
}
exports.default = cityrouter;
//# sourceMappingURL=city.router.js.map