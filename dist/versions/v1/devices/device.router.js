"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_controller_1 = __importDefault(require("./device.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
class devicerouter {
    constructor() {
        this.devicesController = new device_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/devices/:deviceId", this.devicesController.getDevice);
        this.router.get("/devices", this.devicesController.getDevices);
        this.router.post("/devices", this.devicesController.createDevice);
        this.router.patch("/devices", auth_old_1.isAuth, this.devicesController.updateDevice);
        this.router.delete("/devices", auth_old_1.isAuth, this.devicesController.removeDevice);
    }
    validator(route) { }
}
exports.default = devicerouter;
//# sourceMappingURL=device.router.js.map