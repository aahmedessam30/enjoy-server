import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitTermDto } from "./dtos/create-unit-term.dto"
import UnitTermProvider from "./unit-term.provider"

const UnitTerm = new UnitTermProvider()

export default class UnitTermController {
  
  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const { terms } = await UnitTerm.getAll({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { terms }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitTermDto: CreateUnitTermDto = req.body;
      const { term } = await UnitTerm.create(createUnitTermDto);
      res.status(200).json({ message: "created success", payload: { term }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { term } = await UnitTerm.update({ unitTermId: req.params.unitTermId, updateTermDto: req.body})
      res.status(200).json({ message: "updated successfully", payload: { term }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      await UnitTerm.remove({ unitTermId: req.params.unitTermId })
      res.status(200).json({ message: "updated success", status: "success", })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
