import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitPoolDto } from "./dtos/create-unit-pool.dto"
import UnitPoolProvider from "./unit-pool.provider"

const UnitPool = new UnitPoolProvider()

export default class UnitPoolController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { unitPools } = await UnitPool.getUnitPools({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { unitPools }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitPoolDto: CreateUnitPoolDto = req.body;
      const { unitPool } = await UnitPool.create(createUnitPoolDto);
      res.status(200).json({ message: "created success", payload: { unitPool }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      const unitPoolId = req.params.unitPoolId;
      await UnitPool.remove({unitPoolId});
      res.status(200).json({ message: "removed success", status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }
}
