"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const promo_code_interface_1 = require("../interfaces/promo-code.interface");
const main_interface_1 = require("../interfaces/main.interface");
class PromoCode extends sequelize_1.Model {
}
exports.default = PromoCode;
PromoCode.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false,
        unique: true,
    },
    discount: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
    },
    expireDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(promo_code_interface_1.PromoCodetType)),
        allowNull: false,
        defaultValue: promo_code_interface_1.PromoCodetType.UNITS,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(main_interface_1.EStatus)),
        allowNull: false,
        defaultValue: main_interface_1.EStatus.ACTIVE,
    },
}, {
    sequelize: _1.default,
    modelName: "promo_code",
});
//# sourceMappingURL=promo-code.model.js.map