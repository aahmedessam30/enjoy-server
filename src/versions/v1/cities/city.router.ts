import { Router } from "express"
import CityController from "./city.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"

export default class cityrouter {
  router: Router
  private cityController = new CityController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/dashboard/cities/:cityId", isAdmin, this.cityController.getCity)

    this.router.get("/cities", this.cityController.getCities)

    this.router.get("/dashboard/cities", isAdmin, this.cityController.getDashboardCities)

    this.router.post("/dashboard/cities", isAuth, this.cityController.createCity)

    this.router.post("/dashboard/cities", this.cityController.createCity)

    this.router.patch("/dashboard/cities/:cityId", isAdmin, this.cityController.updateCity)
  }
}
