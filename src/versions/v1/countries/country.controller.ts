import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import CountryProvider from "./country.provider"

const Country = new CountryProvider()

export default class CountryController {
  async getCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const { country } = await Country.getCountry(req.params.countryId)
      res.status(200).json({
        message: "fetched successfully",
        payload: { country },
        status: "success",
      })
    } catch (e) {
      CatchError(e, next)
    }
  }
  async getCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 1
      const perPage = Number(req.query.perPage) || 30
      const { result } = await Country.getCountries({ currentPage, perPage })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
  async getDashboardCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 1
      const perPage = Number(req.query.perPage) || 30
      const { result } = await Country.getDashboardCountries({ currentPage, perPage })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
  async createCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const { country } = await Country.createCountry({ country: req.body })
      res.status(201).json({ message: "Country created.", payload: { country }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  async updateCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const countryId = req.params.countryId
      const { country } = await Country.updateCountry({ countryId, data: req.body })
      res.status(201).json({
        message: "Country updated.",
        payload: { country },
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
