import { Router } from "express"
import { isAdmin } from "../../../middlewares/auth.old"
import StatsController from "./stats.controller"

export default class statsRouter {
  router: Router
  private statsController = new StatsController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/stats/users/all", isAdmin, this.statsController.getUsersStats)
  }
  private validator(route: string) {}
}
