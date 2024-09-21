"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class OTP extends sequelize_1.Model {
}
exports.default = OTP;
OTP.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false,
        unique: true,
    },
    code: {
        type: sequelize_1.DataTypes.MEDIUMINT,
        allowNull: false,
    },
    expiresIn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(new Date().getTime() + 5 * 60000)
    },
    used: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: _1.default,
    modelName: "otp",
    createdAt: false
});
//# sourceMappingURL=otp.model.js.map