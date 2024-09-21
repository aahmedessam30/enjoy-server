import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateCoverDto } from "./dtos/create-cover.dto"
import CoverProvider from "./cover.provider"

const Cover = new CoverProvider()

export default class CoverController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { covers } = await Cover.list()
      res.status(200).json({ status: "success", payload: { covers }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createCoverDto: CreateCoverDto = req.body;
      const { cover } = await Cover.create(createCoverDto);
      res.status(200).json({ message: "created success", payload: { cover }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      const coverId = req.params.coverId;
      await Cover.remove({ coverId });
      res.status(200).json({ message: "removed success", payload: { coverId }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }
}
