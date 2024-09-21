"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const poperty_filter_value_interface_1 = require("../interfaces/poperty-filter-value.interface");
class PropertyFilterValue extends sequelize_1.Model {
}
exports.default = PropertyFilterValue;
PropertyFilterValue.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(poperty_filter_value_interface_1.PropertyFilterValueStatus)),
        allowNull: false,
        defaultValue: poperty_filter_value_interface_1.PropertyFilterValueStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "property_filters_value",
});
//# sourceMappingURL=porperty-filter-value.model.js.map