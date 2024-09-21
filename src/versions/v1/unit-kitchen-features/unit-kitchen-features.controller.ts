import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitKitchenFeatureDto } from "./dtos/create-unit-kitchen-feature.dto"
import UnitFeatureProvider from "./unit-kitchen-features.provider"

const UnitKitchenFeature = new UnitFeatureProvider()

export default class UnitKitchenFeatureController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { features } = await UnitKitchenFeature.getUnitKitchenFeatures({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { unitKitchenFeatures: features }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async addUnitKitchenFeatures (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitKitchenFeatureDto: CreateUnitKitchenFeatureDto = req.body;
      const { unitKitchenFeatures } = await UnitKitchenFeature.addUnitKitchenFeatures(createUnitKitchenFeatureDto);
      res.status(200).json({ message: "created success", payload: { unitKitchenFeatures }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      const unitKitchenFeatureId = req.params.unitKitchenFeatureId;
      await UnitKitchenFeature.remove({unitKitchenFeatureId});
      res.status(200).json({ message: "created success", status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }
}
