"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const moment_1 = __importDefault(require("moment"));
const unit_interface_1 = require("../interfaces/unit.interface");
class Unit extends sequelize_1.Model {
}
exports.default = Unit;
Unit.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    titleAr: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    titleEn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    details: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
    },
    priceByDay: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    tax: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    totalPriceByDay: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    dedicatedTo: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(unit_interface_1.DedicatedToType)),
        allowNull: false,
        defaultValue: unit_interface_1.DedicatedToType.SINGLES,
    },
    space: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(unit_interface_1.UnitStatus)),
        allowNull: false,
        defaultValue: unit_interface_1.UnitStatus.PENDING,
    },
    platform: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(unit_interface_1.UnitPlatform)),
    },
    appVersion: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    insurance: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    cancelReservation: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    views: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    bathroomCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    sequelize: _1.default,
    modelName: "unit",
});
function checkDuration(prop) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Unit.findOne({
                    where: { userId: prop.userId },
                    attributes: ["createdAt"],
                    order: [["createdAt", "DESC"]],
                }).then((response) => __awaiter(this, void 0, void 0, function* () {
                    if (!response) {
                        resolve();
                    }
                    else {
                        const createAtAfterDuration = (0, moment_1.default)(response.createdAt).add(moment_1.default.duration(2, "minutes"));
                        if (createAtAfterDuration.isAfter((0, moment_1.default)())) {
                            reject("you must wait for duration");
                        }
                        else {
                            resolve();
                        }
                    }
                }));
            }
            catch (error) {
                reject("error happened in check duration");
            }
        }));
    });
}
//# sourceMappingURL=unit.model.js.map