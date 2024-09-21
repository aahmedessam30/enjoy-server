"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Customer extends sequelize_1.Model {
}
exports.default = Customer;
Customer.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    givenName: {
        type: sequelize_1.DataTypes.STRING(48),
        allowNull: false,
    },
    surname: {
        type: sequelize_1.DataTypes.STRING(48),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    nationalId: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    sequelize: _1.default,
    modelName: "customer",
});
//# sourceMappingURL=customer.model.js.map