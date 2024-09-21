"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class District extends sequelize_1.Model {
}
exports.default = District;
District.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nameAr: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    nameEn: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    lng: {
        type: sequelize_1.DataTypes.STRING(70),
        allowNull: false,
    },
    lat: {
        type: sequelize_1.DataTypes.STRING(70),
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: "district",
});
//# sourceMappingURL=district.model.js.map