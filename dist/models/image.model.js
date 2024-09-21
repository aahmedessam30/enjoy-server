"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const image_interface_1 = require("../interfaces/image.interface");
class Image extends sequelize_1.Model {
}
exports.default = Image;
Image.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(image_interface_1.ImageType)),
        defaultValue: image_interface_1.ImageType.IMAGE,
        allowNull: false,
    },
}, {
    sequelize: _1.default,
    modelName: "image",
});
//# sourceMappingURL=image.model.js.map