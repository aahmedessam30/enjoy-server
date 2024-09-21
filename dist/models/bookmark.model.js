"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Bookmark extends sequelize_1.Model {
}
exports.default = Bookmark;
Bookmark.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: _1.default,
    modelName: "bookmark",
    updatedAt: false
});
//# sourceMappingURL=bookmark.model.js.map