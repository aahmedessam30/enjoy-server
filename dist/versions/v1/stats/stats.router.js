"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_old_1 = require("../../../middlewares/auth.old");
const stats_controller_1 = __importDefault(require("./stats.controller"));
class statsRouter {
    constructor() {
        this.statsController = new stats_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/stats/users/all", auth_old_1.isAdmin, this.statsController.getUsersStats);
    }
    validator(route) { }
}
exports.default = statsRouter;
//# sourceMappingURL=stats.router.js.map