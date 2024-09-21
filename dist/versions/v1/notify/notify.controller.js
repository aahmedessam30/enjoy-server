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
const notify_1 = __importDefault(require("../../../services/notify"));
const notification_provider_1 = __importDefault(require("../notifications/notification.provider"));
const notification_interface_1 = require("../../../interfaces/notification.interface");
const notifyService = new notify_1.default();
const notificationProvider = new notification_provider_1.default();
class NotifyController {
    sendNotifyToAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, title } = req.body;
                yield notifyService.sendNotifyAll({ title, message });
                res.status(200).json({ status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    sendNotifyToUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { message } = req.body;
                yield notificationProvider.sendNotifyToUsers([userId], message, notification_interface_1.NotificationType.NEW_MESSAGE);
                res.status(200).json({ status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = NotifyController;
//# sourceMappingURL=notify.controller.js.map