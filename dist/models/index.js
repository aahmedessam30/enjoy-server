"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const wkx_1 = __importDefault(require("wkx"));
const config_1 = require("../config");
sequelize_1.default.GEOMETRY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
sequelize_1.default.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
sequelize_1.default.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
    return `ST_GeomFromText(${options.escape(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
sequelize_1.default.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
    return `ST_GeomFromText(${options.bindParam(wkx_1.default.Geometry.parseGeoJSON(value).toWkt())})`;
};
const sequelize = new sequelize_1.default.Sequelize(config_1.dbConfig.DB, config_1.dbConfig.USER, config_1.dbConfig.PASSWORD, {
    host: config_1.dbConfig.HOST,
    dialect: "mysql",
    port: Number(config_1.dbConfig.PORT),
    logging: config_1.appConfig.env == "test" ? false : console.log,
    define: {
        charset: "utf8",
        timestamps: true,
    },
    pool: {
        max: config_1.dbConfig.pool.max,
        min: config_1.dbConfig.pool.min,
        acquire: config_1.dbConfig.pool.acquire,
        idle: config_1.dbConfig.pool.idle,
    },
    dialectOptions: config_1.dbConfig.dialectOptions,
});
sequelize.addHook("beforeCount", function (options) {
    if (options.distinct === undefined) {
        if (this._scope.include && this._scope.include.length > 0) {
            options.distinct = true;
            options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`;
        }
        if (options.include) {
            options.include = null;
        }
    }
});
exports.default = sequelize;
//# sourceMappingURL=index.js.map