import { Router } from "express";
import { param, body } from "express-validator";
import { isAuth } from "../../../middlewares/auth.old";
import validateFields from "../../../middlewares/validate-fields";
import RatedCityController from "./rated-city.controller";

export default class RatedCityRouter {
  router: Router
  private ratedCityController: RatedCityController = new RatedCityController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {

    this.router.get("/dashboard/rated-cities", validateFields, this.ratedCityController.adminGet)

    this.router.get("/rated-cities", validateFields, this.ratedCityController.get)

    this.router.post("/rated-cities", isAuth, this.validator("create"), validateFields, this.ratedCityController.create)

    this.router.delete("/rated-cities/:ratedCitiyId", isAuth, this.validator("remove"), validateFields, this.ratedCityController.remove)
  }

  private validator(route: string) {
    if (route == "create") {
      return [
        body("cityId").trim().isUUID().notEmpty().withMessage("enter valid city Id"),
        body("imageId").trim().isUUID().notEmpty().withMessage("enter valid image Id"),
        body("rate").trim().notEmpty().isFloat().withMessage("enter valid rate"),
      ]
    } else if (route == "remove") {
      return [param("ratedCitiyId").trim().notEmpty().isUUID().withMessage("enter valid rated city Id")]
    }
  }
}
