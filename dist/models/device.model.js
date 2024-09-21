"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const main_interface_1 = require("../interfaces/main.interface");
class Device extends sequelize_1.Model {
}
exports.default = Device;
Device.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(main_interface_1.EStatus)),
        allowNull: false,
        defaultValue: main_interface_1.EStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "device",
});
//# sourceMappingURL=device.model.js.map