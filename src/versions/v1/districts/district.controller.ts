import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { CatchError, GenerateError } from "../../../services/services"
import DistrictProvider from "./district.provider"

const District = new DistrictProvider()

export default class DistrictController {
  async getDistrict(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
      }
      const { district } = await District.getDistrict({ districtId: req.params.districtId })
      res.status(200).json({
        message: "fetched successfully",
        payload: { district },
        status: "success",
      })
    } catch (e) {
      CatchError(e, next)
    }
  }
  async getDistricts(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 30
      const { result } = await District.getDistricts({ currentPage, perPage })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getCityDistricts(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 15
      const cityId = req.params.cityId;
      const { result } = await District.getCityDistricts({ cityId, currentPage, perPage });
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async createDistrict(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
      }
      const { district } = await District.createDistrict({ district: req.body })
      res.status(201).json({ message: "District created.", payload: { district }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  async updateDistrict(req: Request, res: Response, next: NextFunction) {
    try {
      const { district } = await District.updateDistrict({
        districtId: req.params.districtId,
        data: req.body,
      })
      res.status(201).json({
        message: "District updated.",
        payload: { district },
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
