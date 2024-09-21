import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateUnitBoardDto } from "./dtos/create-unit-board.dto"
import UnitBoardProvider from "./unit-board.provider"

const UnitBoard = new UnitBoardProvider()

export default class UnitBoardController {
  
  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const { boards } = await UnitBoard.getAll({ unitId: req.params.unitId })
      res.status(200).json({ status: "success", payload: { boards }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitBoardDto: CreateUnitBoardDto = req.body;
      const { board } = await UnitBoard.create(createUnitBoardDto);
      res.status(200).json({ message: "created success", payload: { board }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { board } = await UnitBoard.update({ unitBoardId: req.params.unitBoardId, updateBoardDto: req.body})
      res.status(200).json({ message: "updated successfully", payload: { board }, status: "success", })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
