import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { CatchError, GenerateError } from "../../../services/services"
import CityProvider from "./city.provider"

const City = new CityProvider()

export default class CityController {
  async getCity(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
      }
      const { city } = await City.getCity({ cityId: req.params.cityId })
      res.status(200).json({ message: "fetched successfully", payload: { city }, status: "success", })
    } catch (e) {
      CatchError(e, next)
    }
  }
  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await City.getCities()
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
  async getDashboardCities(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 15
      const { result } = await City.getDashboardCities({ currentPage, perPage })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
  async createCity(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
      }
      const { city } = await City.createCity({ city: req.body })
      res.status(201).json({ message: "City created.", payload: { city }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  async updateCity(req: Request, res: Response, next: NextFunction) {
    try {
      const cityId = req.params.cityId
      const { city } = await City.updateCity({ cityId, data: req.body })
      res.status(201).json({
        message: "city updated.",
        payload: { city },
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
