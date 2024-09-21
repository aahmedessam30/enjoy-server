import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitBedroomDto } from "./dtos/create-unit-bedroom.dto"
import UnitBedroomProvider from "./unit-bedroom.provider"

const UnitBedroom = new UnitBedroomProvider()

export default class UnitBedroomController {
  
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { bedroom } = await UnitBedroom.getOne({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { bedroom }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitBedroomDto: CreateUnitBedroomDto = req.body;
      const { bedroom } = await UnitBedroom.create(createUnitBedroomDto);
      res.status(200).json({ message: "created success", payload: { bedroom }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { bedroom } = await UnitBedroom.update({ unitBedroomId: req.params.unitBedroomId, updateBedroomDto: req.body})
      res.status(200).json({ message: "updated successfully", payload: { bedroom }, status: "success", })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
