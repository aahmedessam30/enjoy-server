import { Router } from "express"
import { param, body } from "express-validator"
import { isAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import UnitTermController from "./unit-term.controller"

export default class UnitTermRouter {
  router: Router
  private unitTermController: UnitTermController = new UnitTermController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-terms/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitTermController.getAll)

    this.router.post("/unit-terms", isAuth, this.validator("create"), validateFields, this.unitTermController.create)

    this.router.patch("/unit-terms/:unitTermId", isAuth, this.validator("update"), validateFields, this.unitTermController.update)

    this.router.delete("/unit-terms/:unitTermId", isAuth, this.validator("remove"), validateFields, this.unitTermController.remove)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")]
    } else if (route == "create") {
      return [
        body("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("description").trim().isString().notEmpty().withMessage("entre valid description"),
      ]
    } else if (route == "update") {
      return [
        param("unitTermId").trim().isUUID().notEmpty().withMessage("enter valid unit term Id"),
        body("description").trim().isString().notEmpty().withMessage("entre valid description"),
      ]
    } else if (route == "remove") {
      return [
        param("unitTermId").trim().isUUID().notEmpty().withMessage("enter valid unit term Id"),
      ]
    }
  }
}
