import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitFeatureDto } from "./dtos/create-unit-feature.dto"
import UnitFeatureProvider from "./unit-features.provider"

const UnitFeature = new UnitFeatureProvider()

export default class UnitFeatureController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { features } = await UnitFeature.getUnitFeatures({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { unitFeatures: features }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async addUnitFeatures (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitFeatureDto: CreateUnitFeatureDto = req.body;
      const { unitFeatures } = await UnitFeature.addUnitFeatures(createUnitFeatureDto);
      res.status(200).json({ message: "created success", payload: { unitFeatures }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }
}
