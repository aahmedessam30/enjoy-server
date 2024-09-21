"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const notification_interface_1 = require("../interfaces/notification.interface");
class Notification extends sequelize_1.Model {
}
exports.default = Notification;
Notification.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: "VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin",
        allowNull: false,
    },
    body: {
        type: sequelize_1.DataTypes.TEXT + " CHARACTER SET utf8mb4 COLLATE utf8mb4_bin",
        allowNull: false,
    },
    readAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(notification_interface_1.NotificationType)),
        allowNull: false,
        defaultValue: notification_interface_1.NotificationType.GENERAL,
    },
    data: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(notification_interface_1.NotificationStatus)),
        allowNull: false,
        defaultValue: notification_interface_1.NotificationStatus.UNREAD,
    },
}, {
    sequelize: _1.default,
    modelName: "notification",
});
//# sourceMappingURL=notification.model.js.map