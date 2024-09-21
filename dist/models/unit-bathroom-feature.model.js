"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class UnitBathroomFeature extends sequelize_1.Model {
}
exports.default = UnitBathroomFeature;
UnitBathroomFeature.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: _1.default,
    modelName: "unit_bathroom_feature",
    timestamps: false,
});
//# sourceMappingURL=unit-bathroom-feature.model.js.map