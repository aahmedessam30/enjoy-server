import DistrictController from "./district.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import { Router } from "express"

export default class districtrouter {
  router: Router
  private districtController = new DistrictController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/dashboard/districts/cities/:cityId", this.districtController.getCityDistricts)
  
    this.router.get("/dashboard/districts/:districtId", isAdmin, this.districtController.getDistrict)

    this.router.get("/districts", this.districtController.getDistricts)

    this.router.post("/dashboard/districts", isAuth, this.districtController.createDistrict)

    this.router.patch("/dashboard/districts/:districtId", isAdmin, this.districtController.updateDistrict)
  }
  private validator(route: string) {}
}
