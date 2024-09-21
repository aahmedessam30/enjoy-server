"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const main_interface_1 = require("../interfaces/main.interface");
class Category extends sequelize_1.Model {
}
exports.default = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nameAr: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
    },
    nameEn: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(main_interface_1.EStatus)),
        allowNull: false,
        defaultValue: main_interface_1.EStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "category",
});
//# sourceMappingURL=category.model.js.map