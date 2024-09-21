"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class UnitLocation extends sequelize_1.Model {
}
exports.default = UnitLocation;
UnitLocation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    address1: {
        type: sequelize_1.DataTypes.STRING,
    },
    lng: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: "unit_location",
    timestamps: false,
});
//# sourceMappingURL=unit-location.model.js.map