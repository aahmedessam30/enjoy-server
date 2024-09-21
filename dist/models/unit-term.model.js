"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class UnitTerm extends sequelize_1.Model {
}
exports.default = UnitTerm;
UnitTerm.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: _1.default,
    modelName: "unit_term",
    timestamps: false,
});
//# sourceMappingURL=unit-term.model.js.map