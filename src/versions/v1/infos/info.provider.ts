//Business logic for all Info routes
import { Info } from "../../../db"
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"

export default class InfoProvider extends MainProvider {
  constructor() {
    super("info")
  }
  async create({ body }) {
    const info = await Info.create(body)
    return { info }
  }
  async update({ infoId, body }) {
    const info = await Info.findByPk(infoId)
    if (!info) {
      GenerateError({ message: this._i18n("infoNotFound"), code: 404 })
    }
    info.value = body.value

    const result = await info.save()
    return { result }
  }
  async list({ limit, page }) {
    const limitMax = Number(limit) > 50 ? 50 : Number(limit)
    const offset = (Number(page) - 1) * Number(limit)
    const { count, rows } = await Info.findAndCountAll({
      limit: limitMax,
      offset: offset,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched success",
        payload: { data: rows, totalItems: count, limit: limitMax, currentPage: page },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotDataYet"),
        payload: { data: [], totalItems: count, limit: limitMax, currentPage: page },
        status: "success",
      }
    }
    return { result }
  }
  async getOption({ keys }) {
    const option = await Info.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { key: keys },
    })
    const result = { message: "Fetched successfully", payload: { option }, status: "success" }
    return { result }
  }
}
