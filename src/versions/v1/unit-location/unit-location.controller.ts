import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitLocationDto } from "./dtos/create-unit-location.dto"
import UnitLocationProvider from "./unit-location.provider"

const UnitLocation = new UnitLocationProvider()

export default class UnitLocationController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { location } = await UnitLocation.getUnitLocation({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { location }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createUnitLocation (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitLocationDto: CreateUnitLocationDto = req.body;
      createUnitLocationDto.address1 = req.body.location;
      const { location } = await UnitLocation.createUnitLocation(createUnitLocationDto);
      res.status(200).json({ message: "created success", payload: { location }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { location } = await UnitLocation.updateUnitLocation({
        unitId: req.params.unitId,
        updateLocationDto: req.body,
      })
      res.status(200).json({
        message: "updated successfully",
        payload: { location },
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
