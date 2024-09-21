"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const facility_interface_1 = require("../interfaces/facility.interface");
class Facility extends sequelize_1.Model {
}
exports.default = Facility;
Facility.init({
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
    nameFr: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(facility_interface_1.FacilityStatus)),
        allowNull: false,
        defaultValue: facility_interface_1.FacilityStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "facility",
});
//# sourceMappingURL=facility.model.js.map