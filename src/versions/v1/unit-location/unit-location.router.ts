import { Router } from "express"
import { param, body } from "express-validator"
import { isAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import UnitLocationController from "./unit-location.controller"

export default class UnitLocationRouter {
  router: Router
  private unitLocationController: UnitLocationController = new UnitLocationController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-locations/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitLocationController.get)

    this.router.post("/unit-locations", isAuth, this.validator("create"), validateFields, this.unitLocationController.createUnitLocation)

    this.router.patch("/unit-locations/units/:unitId", isAuth, this.validator("update"), validateFields, this.unitLocationController.update)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")]
    } else if (route == "create") {
      return [
        body("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("districtId").trim().isUUID().withMessage("choose valid district of the unit."),
        body("cityId").trim().isUUID().withMessage("choose valid city of the unit."),
        body("location").isString(),
        body("lat").trim().isDecimal().notEmpty().withMessage("entre valid lat number"),
        body("lng").trim().isDecimal().notEmpty().withMessage("entre valid lng number"),
      ]
    } else if (route == "update") {
      return [
        param("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("districtId").isUUID().withMessage("choose valid district of the unit."),
        body("cityId").trim().isUUID().withMessage("choose valid city of the unit."),
        body("location").isString(),
        body("lat").trim().isDecimal().notEmpty().withMessage("entre valid lat number"),
        body("lng").trim().isDecimal().notEmpty().withMessage("entre valid lng number"),
      ]
    }
  }
}
