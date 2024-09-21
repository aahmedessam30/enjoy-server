"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const reated_city_interface_1 = require("../interfaces/reated-city.interface");
class RatedCity extends sequelize_1.Model {
}
exports.default = RatedCity;
RatedCity.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    rate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(reated_city_interface_1.RatedCityStatus)),
        allowNull: false,
        defaultValue: reated_city_interface_1.RatedCityStatus.ACTIVE
    }
}, {
    sequelize: _1.default,
    modelName: "rated-city",
    timestamps: false
});
//# sourceMappingURL=rated-city.model.js.map