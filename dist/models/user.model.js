"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const user_interface_1 = require("../interfaces/user.interface");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(120),
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(14),
        allowNull: false,
        unique: true,
    },
    code: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(user_interface_1.UserCode)),
        allowNull: false,
        defaultValue: user_interface_1.UserCode._966,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(user_interface_1.UserStatus)),
        allowNull: false,
        defaultValue: user_interface_1.UserStatus.ACTIVE,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(user_interface_1.UserRole)),
        allowNull: false,
        defaultValue: user_interface_1.UserRole.GUEST,
    },
    reference: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    authorize: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: _1.default,
    modelName: "user",
});
//# sourceMappingURL=user.model.js.map