//Business logic for all District routes
import { GenerateError } from "../../../services/services"
import { District, City } from "../../../db"
import MainProvider from "../index.provider"

export default class DistrictProvider extends MainProvider {
  constructor() {
    super("district")
  }
  async getDistrict({ districtId }) {
    const district = await District.findByPk(districtId)
    if (!district) {
      GenerateError({ message: this._i18n("districtNotFound"), code: 404 })
    }
    return { district }
  }

  async getDistricts({ currentPage = 0, perPage = 30 }) {
    const { count, rows } = await District.findAndCountAll({
      limit: perPage,
      include: { model: City, attributes: ["nameAr", "nameEn"] },
      offset: currentPage * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { districts: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotDistrictsYet"),
        payload: { districts: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async getCityDistricts({ cityId, currentPage = 0, perPage = 15 }) {
    const { count, rows } = await District.findAndCountAll({
      limit: perPage,
      include: {model: City, attributes: ["id", "nameAr", "nameEn"], where: {id: cityId}},
      offset: currentPage * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { districts: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotDistrictsYet"),
        payload: { districts: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async createDistrict({ district }) {
    const result = await District.create({
      nameAr: district.nameAr,
      nameEn: district.nameEn,
      lat: district.lat,
      lng: district.lng,
      cityId: district.cityId,
    })
    return { district: result }
  }

  async updateDistrict({ districtId, data }) {
    const district = await District.findByPk(districtId)
    if (!district) {
      GenerateError({ message: this._i18n("districtNotFound"), code: 404 })
    }
    district.nameAr = data.nameAr
    district.nameEn = data.nameEn
    district.lng = data.lng
    district.lat = data.lat
    district.cityId = data.cityId
    const result = await district.save()
    return { district: result }
  }
}
