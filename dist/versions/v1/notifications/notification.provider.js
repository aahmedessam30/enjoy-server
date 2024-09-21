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
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const device_provider_1 = __importDefault(require("../devices/device.provider"));
const notify_1 = __importDefault(require("../../../services/notify"));
const socket_1 = require("../socket");
const notification_interface_1 = require("../../../interfaces/notification.interface");
const models_1 = __importDefault(require("../../../models"));
class NotificationProvider {
    createNotificationToUsers(users, title, body, type, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield db_1.Notification.create({
                title: title,
                body: body,
                type: type,
                data: data,
            });
            yield notification.addUsers(users);
            return { notification };
        });
    }
    getNotifications({ userId, currentPage, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Notification.findAndCountAll({
                distinct: true,
                include: [
                    {
                        model: db_1.User,
                        attributes: ["id"],
                        where: { id: userId, status: { [sequelize_1.Op.ne]: "DELETED" } },
                        through: { attributes: [] },
                    },
                ],
                order: [["createdAt", "DESC"]],
                limit: perPage,
                offset: currentPage * perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: {
                        notifications: rows,
                        totalItems: count,
                        currentPage,
                        limit: perPage,
                    },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not notifications yet.!",
                    payload: { notifications: [], totalItems: count, currentPage, limit: perPage },
                    status: "success",
                };
            }
            return { result };
        });
    }
    makeRead({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.Notification.update({ readAt: new Date(), status: notification_interface_1.NotificationStatus.READ }, {
                where: {
                    status: notification_interface_1.NotificationStatus.UNREAD,
                    id: { [sequelize_1.Op.in]: models_1.default.literal(`(SELECT notificationId FROM user_notifications WHERE userId=${userId})`) },
                },
            });
        });
    }
    unreadCount({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield db_1.Notification.count({
                where: {
                    status: notification_interface_1.NotificationStatus.UNREAD,
                    id: { [sequelize_1.Op.in]: models_1.default.literal(`(SELECT notificationId FROM user_notifications WHERE userId=${userId})`) },
                },
            });
            return count;
        });
    }
    deleteNotification({ notificationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const notify = yield db_1.Notification.findByPk(notificationId);
            if (!notify) {
                (0, services_1.GenerateError)({ message: "Notification is not found.", code: 404 });
            }
            notify.status = notification_interface_1.NotificationStatus.DELETED;
            yield notify.save();
        });
    }
    sendNotifyToUsers(users, body, type, deeplink = "darkkom://notify", data, title = "تطبيق عقاريتو") {
        return __awaiter(this, void 0, void 0, function* () {
            const { notification } = yield new NotificationProvider().createNotificationToUsers(users, title, body, type, data);
            new socket_1.Socket().send("notify:receive", users.map(String), notification);
            const { tokens } = yield new device_provider_1.default().getUsersDevices({ users: users });
            if (notification && tokens.length > 0) {
                yield new notify_1.default().sendNotify({
                    title: title,
                    message: body,
                    tokens,
                    deeplink: deeplink,
                });
            }
        });
    }
}
exports.default = NotificationProvider;
//# sourceMappingURL=notification.provider.js.map