import { ProjectionAlias } from "sequelize/types"
import { fn, Op, Sequelize } from "sequelize"
import path from "path"
import fs from "fs"

export default class MainProvider {
  protected providerName: string
  constructor(providerName: string) {
    this.providerName = providerName
    this.i18nAssetsNotFound(providerName)
  }
  protected imgBaseUrl = "https://enjoy.fra1.digitaloceanspaces.com/uploads/"
  protected imgPath = [fn("CONCAT", this.imgBaseUrl), "imagepath"]

  protected whereFilters(object: object, fields?: string[]) {
    try {
      var _this = this
      const filters: object = JSON.parse(String(object))
      if (!object || Object.keys(filters).length === 0) return {}
      let where: any = {}
      Object.keys(filters).map(function (key) {
        if (!fields || fields.includes(key)) {
          if (key == "name") {
            where.nameAr = { [Op.like]: `%${filters[`${key}`]}%` }
            // where.nameFr = { [Op.like]: `%${filters[`${key}`]}%` }
            where.nameEn = { [Op.like]: `%${filters[`${key}`]}%` }
          } else if (key.substring(0, 2) == "s_") {
            const subKey = _this.lowerize(key.slice(2))
            where[`${subKey}`] = { [Op.like]: `%${filters[`${key}`]}%` }
          } else if (key.substring(0, 3) == "min") {
            const subKey = _this.lowerize(key.slice(3))

            where[`${subKey}`] = { ...where[`${subKey}`], [Op.gte]: Number(filters[`${key}`]) }
          } else if (key.substring(0, 3) == "max") {
            const subKey = _this.lowerize(key.slice(3))
            where[`${subKey}`] = { ...where[`${subKey}`], [Op.lte]: Number(filters[`${key}`]) }
          } else {
            filters[`${key}`] && (where[`${key}`] = filters[`${key}`])
          }
        }
      })
      return where
    } catch (e) {
      return {}
    }
  }
  protected concatImg(field: string, col: string = field): ProjectionAlias {
    return [fn("CONCAT", this.imgBaseUrl, Sequelize.col(col)), field]
  }

  protected lowerize(s: string): string {
    return (s && s[0].toLowerCase() + s.slice(1)) || ""
  }
  _i18n(key: string): string {
    return `$_${this.providerName}|${key}`
  }
  i18nAssetsNotFound(name: string) {
    if (!fs.existsSync(path.join(__dirname, `../../../assets/i18n/${name}`))) {
      throw new Error(`not found in i18n file`)
    }
  }
}
