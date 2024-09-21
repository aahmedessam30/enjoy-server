import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreatePoolDto } from "./dtos/create-pool.dto"
import { UpdatePoolDto } from "./dtos/update-pool.dto"
import PoolProvider from "./pool.provider"

const poolProvider = new PoolProvider()

export default class FeatureController {
  async getPools(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await poolProvider.getPools()
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { pool } = await poolProvider.findOne({poolId: req.params.poolId})
      res.status(200).json({ message: "success", payload: { pool }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async  adminGetPools (req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 15
      const { result } = await poolProvider.adminGetPools({ currentPage, perPage })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createPoolDto: CreatePoolDto =  req.body;
      const { pool } = await poolProvider.create(createPoolDto)
      res.status(201).json({ message: "pool created.", payload: { pool }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const updatePoolDto: UpdatePoolDto =  req.body;
      updatePoolDto.poolId = req.params.poolId
      const { pool } = await poolProvider.update(updatePoolDto)
      res.status(200).json({ message: "pool updated.", payload: { pool }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      await poolProvider.remove({ poolId: req.params.poolId })
      res.status(201).json({ message: "pool deleted.", status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
}
