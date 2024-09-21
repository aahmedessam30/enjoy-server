"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class BillingAddress extends sequelize_1.Model {
}
exports.default = BillingAddress;
BillingAddress.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    street1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    street2: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING(80),
    },
    postcode: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING(4),
        allowNull: false,
        defaultValue: "SA",
    },
}, {
    sequelize: _1.default,
    modelName: "billing_address",
});
//# sourceMappingURL=billing-address.model.js.map