import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import StatsProvider from "./stats.provider"

const Stats = new StatsProvider()

export default class StatsController {
  async getUsersStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Stats.getUsersStats()
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
}
