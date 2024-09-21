"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const pool_interface_1 = require("../interfaces/pool.interface");
class Pool extends sequelize_1.Model {
}
exports.default = Pool;
Pool.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nameAr: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nameEn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(pool_interface_1.PoolStatus)),
        allowNull: false,
        defaultValue: pool_interface_1.PoolStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "pool",
});
//# sourceMappingURL=pool.model.js.map