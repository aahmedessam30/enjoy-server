//Business logic for all Country routes
import { GenerateError } from "../../../services/services"
import { Country } from "../../../db"
import MainProvider from "../index.provider"

export default class CountryProvider extends MainProvider {
  constructor() {
    super("country")
  }
  async getCity({ countryId }) {
    const country = await Country.findByPk(countryId)
    if (!country) {
      GenerateError({ message: this._i18n("countryNotFound"), code: 404 })
    }
    return { country }
  }

  async getCountries({ currentPage = 1, perPage = 30 }) {
    const { count, rows } = await Country.findAndCountAll({
      attributes: ['id', 'nameAr', 'nameEn', 'code'],
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { countries: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("ThereNotCountriesYet"),
        payload: { countries: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }
  async getCountry(countryId: string) {
    const country = await Country.findByPk(countryId, { attributes: { exclude: ["createdAt", "updatedAt"] } })
    if (!country) {
      GenerateError({ message: this._i18n("countryNotFound"), code: 404 })
    }
    return { country }
  }

  async getDashboardCountries({ currentPage = 0, perPage = 30 }) {
    const { count, rows } = await Country.findAndCountAll({
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { countries: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("ThereNotCountriesYet"),
        payload: { countries: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async createCountry({ country }) {
    const result = await Country.create({
      nameAr: country.nameAr,
      nameEn: country.nameEn,
      code: country.code,
    })
    return { country: result }
  }

  async updateCountry({ countryId, data }) {
    const country = await Country.findByPk(countryId)
    if (!country) {
      GenerateError({ message: this._i18n("countryNotFound"), code: 404 })
    }
    country.nameAr = data.nameAr
    country.nameEn = data.nameEn
    country.code = data.code;
  
    const result = await country.save()
    return { country: result }
  }
}
