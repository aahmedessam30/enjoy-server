"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const feature_interface_1 = require("../interfaces/feature.interface");
class Feature extends sequelize_1.Model {
}
exports.default = Feature;
Feature.init({
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
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(feature_interface_1.FeatureType)),
        allowNull: false,
        defaultValue: feature_interface_1.FeatureType.GENERAL,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(feature_interface_1.FeatureStatus)),
        allowNull: false,
        defaultValue: feature_interface_1.FeatureStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "feature",
});
//# sourceMappingURL=feature.model.js.map