"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../../services/services");
const notification_provider_1 = __importDefault(require("./notification.provider"));
const Notification = new notification_provider_1.default();
class NotificationController {
    getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 30;
                const { result } = yield Notification.getNotifications({ userId: req.userId, currentPage, perPage });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    makeRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Notification.makeRead({ userId: req.userId });
                res.status(200).json({ message: "Notification readed", status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    unreadCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield Notification.unreadCount({ userId: req.userId });
                res.status(200).json({ message: "Fetched success", payload: { count }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    removeNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationId = req.query.notificationId;
                yield Notification.deleteNotification({ notificationId });
                res.status(200).json({ message: "Notification removed", status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = NotificationController;
//# sourceMappingURL=notification.controller.js.map