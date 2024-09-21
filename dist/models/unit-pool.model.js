"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class UnitPool extends sequelize_1.Model {
}
exports.default = UnitPool;
UnitPool.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    width: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    length: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    height: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: _1.default,
    modelName: "unit_pool",
    timestamps: false,
});
//# sourceMappingURL=unit-pool.model.js.map