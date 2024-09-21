"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const transaction_interface_1 = require("../interfaces/transaction.interface");
class Transaction extends sequelize_1.Model {
}
exports.default = Transaction;
Transaction.init({
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
    amountAfterDiscount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(transaction_interface_1.TransactionStatus)),
        allowNull: false,
        defaultValue: transaction_interface_1.TransactionStatus.PENDING,
    },
}, {
    sequelize: _1.default,
    modelName: "transaction",
});
//# sourceMappingURL=transaction.model.js.map