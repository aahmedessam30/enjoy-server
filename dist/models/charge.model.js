"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const charge_interface_1 = require("../interfaces/charge.interface");
class Charge extends sequelize_1.Model {
}
exports.default = Charge;
Charge.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    enjoy_fee: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    enjoy_fee_percent: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    subtotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    total_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    vat_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    unit_discount_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    promo_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    host_fee: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    host_profit: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    host_fee_percent: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    profit: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    payment_id: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    transactionId: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    reference: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(charge_interface_1.ChargeStatus)),
        allowNull: false,
        defaultValue: charge_interface_1.ChargeStatus.CREATED,
    },
}, {
    sequelize: _1.default,
    modelName: "charge",
});
//# sourceMappingURL=charge.model.js.map