import { Router } from "express"
import { param, body } from "express-validator"
import { isAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import UnitBedroomController from "./unit-bedroom.controller"

export default class UnitBedroomRouter {
  router: Router
  private unitBedroomController: UnitBedroomController = new UnitBedroomController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-bedrooms/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitBedroomController.getOne)

    this.router.post("/unit-bedrooms", isAuth, this.validator("create"), validateFields, this.unitBedroomController.create)

    this.router.patch("/unit-bedrooms/units/:unitBedroomId", isAuth, this.validator("update"), validateFields, this.unitBedroomController.update)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")]
    } else if (route == "create") {
      return [
        body("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("roomCount").trim().isInt().notEmpty().withMessage("entre valid roomCount number"),
        body("singleBedCount").trim().isInt().notEmpty().withMessage("entre valid singleBedCount number"),
        body("masterBedCount").trim().isInt().notEmpty().withMessage("entre valid masterBedCount number"),
      ]
    } else if (route == "update") {
      return [
        param("unitBedroomId").trim().isUUID().notEmpty().withMessage("enter valid unit bedroom Id"),
        body("roomCount").trim().isInt().notEmpty().withMessage("entre valid roomCount number"),
        body("singleBedCount").trim().isInt().notEmpty().withMessage("entre valid singleBedCount number"),
        body("masterBedCount").trim().isInt().notEmpty().withMessage("entre valid masterBedCount number"),
      ]
    }
  }
}
