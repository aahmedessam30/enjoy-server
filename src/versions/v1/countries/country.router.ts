import { Router } from "express"

import CountryController from "./country.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"

export default class countryrouter {
  router: Router
  private countryController = new CountryController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/", this.countryController.getCountries)

    this.router.post("/", isAuth, this.countryController.createCountry)

    this.router.patch("/:countryId", isAuth, this.countryController.updateCountry)

    this.router.get("/dashboard", this.countryController.getDashboardCountries)
    // Get one country
    this.router.get("/:countryId", this.countryController.getCountry)
  }

  private validator(route: string) {}
}
