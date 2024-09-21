"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const send_email_interface_1 = require("../interfaces/send-email.interface");
class SendEmail extends sequelize_1.Model {
}
exports.default = SendEmail;
SendEmail.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    template: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    subject: {
        type: "VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin",
        allowNull: false,
    },
    context: {
        type: sequelize_1.DataTypes.JSON,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(send_email_interface_1.EmailStatus)),
        allowNull: false,
        defaultValue: send_email_interface_1.EmailStatus.ACCEPTED,
    },
}, {
    sequelize: _1.default,
    modelName: "send_email",
});
//# sourceMappingURL=send-email.model.js.map