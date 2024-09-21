import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitBathroomFeatureDto } from "./dtos/create-unit-bathroom-feature.dto"
import UnitFeatureProvider from "./unit-bathroom-features.provider"

const UnitBathroomFeature = new UnitFeatureProvider()

export default class UnitBathroomFeatureController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { features } = await UnitBathroomFeature.getUnitBathroomFeatures({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { unitBathroomFeatures: features }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async addUnitBathroomFeatures (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitBathroomFeatureDto: CreateUnitBathroomFeatureDto = req.body;
      const { unitBathroomFeatures } = await UnitBathroomFeature.addUnitBathroomFeatures(createUnitBathroomFeatureDto);
      res.status(200).json({ message: "created success", payload: { unitBathroomFeatures }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      const unitBathroomFeatureId = req.params.unitBathroomFeatureId;
      await UnitBathroomFeature.remove({unitBathroomFeatureId});
      res.status(200).json({ message: "removed success", status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }
}
