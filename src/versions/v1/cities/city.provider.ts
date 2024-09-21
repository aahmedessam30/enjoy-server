//Business logic for all City routes
import { GenerateError } from "../../../services/services"
import { City, District, Country } from "../../../db"
import MainProvider from "../index.provider"

export default class CityProvider extends MainProvider {
  constructor() {
    super("city")
  }
  async getCity({ cityId }) {
    const city = await City.findByPk(cityId)
    if (!city) {
      GenerateError({ message: this._i18n("cityNotFound"), code: 404 })
    }
    return { city }
  }

  async getCities() {
    const { count, rows } = await City.findAndCountAll({
      attributes: ['id', 'nameAr', 'nameEn', 'lat', 'lng'],
      distinct: true,
      include: { model: District, attributes: ['id', 'nameAr', 'nameEn', 'lat', 'lng', 'cityId'] },
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { cities: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotCitysYet"),
        payload: { cities: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async getDashboardCities({ currentPage, perPage }) {
    const { count, rows } = await City.findAndCountAll({
      include: { model: Country, attributes: ["nameAr"] },
      limit: perPage,
      offset: currentPage * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { cities: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotCitysYet"),
        payload: { cities: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  //Dashboard
  async createCity({ city }) {
    const result = await City.create({
      nameAr: city.nameAr,
      nameEn: city.nameEn,
      lng: city.lng,
      lat: city.lat,
      countryId: city.countryId,
    })
    return { city: result }
  }

  //Dashboard
  async updateCity({ cityId, data }) {
    const city = await City.findByPk(cityId)
    if (!city) {
      GenerateError({ message: this._i18n("cityNotFound"), code: 404 })
    }
    city.nameAr = data.nameAr
    city.nameEn = data.nameEn
    city.lng = data.lng
    city.lat = data.lat
    const result = await city.save()
    return { city: result }
  }
}
