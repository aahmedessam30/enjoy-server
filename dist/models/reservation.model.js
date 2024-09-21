"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const reservation_interface_1 = require("../interfaces/reservation.interface");
class Reservation extends sequelize_1.Model {
}
exports.default = Reservation;
Reservation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    reference: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    nights: {
        type: sequelize_1.DataTypes.MEDIUMINT,
        allowNull: false,
        defaultValue: 0,
    },
    checkIn: {
        type: sequelize_1.DataTypes.DATE,
    },
    checkOut: {
        type: sequelize_1.DataTypes.DATE,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(reservation_interface_1.ReservationStatus)),
        allowNull: false,
        defaultValue: reservation_interface_1.ReservationStatus.CREATED,
    },
}, {
    sequelize: _1.default,
    modelName: "reservation",
});
//# sourceMappingURL=reservation.model.js.map