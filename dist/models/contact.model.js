"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Contact extends sequelize_1.Model {
}
exports.default = Contact;
Contact.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: true
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(14),
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: '',
        allowNull: true
    }
}, {
    sequelize: _1.default,
    modelName: "contact",
});
//# sourceMappingURL=contact.model.js.map