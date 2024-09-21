"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = __importDefault(require("./country.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
class countryrouter {
    constructor() {
        this.countryController = new country_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", this.countryController.getCountries);
        this.router.post("/", auth_old_1.isAuth, this.countryController.createCountry);
        this.router.patch("/:countryId", auth_old_1.isAuth, this.countryController.updateCountry);
        this.router.get("/dashboard", this.countryController.getDashboardCountries);
        this.router.get("/:countryId", this.countryController.getCountry);
    }
    validator(route) { }
}
exports.default = countryrouter;
//# sourceMappingURL=country.router.js.map