"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = __importDefault(require("./notification.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
class NotificationRouter {
    constructor() {
        this.notificationController = new notification_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", auth_old_1.isAuth, this.notificationController.getNotifications);
        this.router.post("/read", auth_old_1.isAuth, this.notificationController.makeRead);
        this.router.get("/unread-count", auth_old_1.isAuth, this.notificationController.unreadCount);
        this.router.delete("/", auth_old_1.isAuth, this.notificationController.removeNotification);
    }
    validator(route) { }
}
exports.default = NotificationRouter;
//# sourceMappingURL=notification.router.js.map