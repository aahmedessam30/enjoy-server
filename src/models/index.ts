import Sequelize from "sequelize"
import wkx from "wkx"
import { appConfig, dbConfig } from "../config"

Sequelize.GEOMETRY.prototype._stringify = function _stringify(value, options) {
  return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`
}
Sequelize.GEOMETRY.prototype._bindParam = function _bindParam(value, options) {
  return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`
}
Sequelize.GEOGRAPHY.prototype._stringify = function _stringify(value, options) {
  return `ST_GeomFromText(${options.escape(wkx.Geometry.parseGeoJSON(value).toWkt())})`
}
Sequelize.GEOGRAPHY.prototype._bindParam = function _bindParam(value, options) {
  return `ST_GeomFromText(${options.bindParam(wkx.Geometry.parseGeoJSON(value).toWkt())})`
}

const sequelize = new Sequelize.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
  port: Number(dbConfig.PORT),
  logging: appConfig.env == "test" ? false : console.log,
  define: {
    charset: "utf8",
    timestamps: true,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: dbConfig.dialectOptions,
})
/**
 * Solve count wrong in <findAndCountAll()>
 * Add a permanent global hook to prevent unknowingly hitting this Sequelize bug:
 * https://github.com/sequelize/sequelize/issues/10557
 */
sequelize.addHook("beforeCount", function (options) {
  if (options.distinct === undefined) {
    if (this._scope.include && this._scope.include.length > 0) {
      options.distinct = true
      options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`
    }
    if (options.include) {
      options.include = null
    }
  }
})

export default sequelize
