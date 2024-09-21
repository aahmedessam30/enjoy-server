"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const cover_interface_1 = require("../interfaces/cover.interface");
class Cover extends sequelize_1.Model {
}
exports.default = Cover;
Cover.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(cover_interface_1.CoverStatus)),
        allowNull: false,
        defaultValue: cover_interface_1.CoverStatus.ACTIVE
    }
}, {
    sequelize: _1.default,
    modelName: "cover",
    updatedAt: false
});
//# sourceMappingURL=cover.model.js.map