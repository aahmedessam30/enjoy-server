import { Router } from "express"
import { param, body } from "express-validator"
import { isAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import UnitBoardController from "./unit-board.controller"

export default class UnitBoardRouter {
  router: Router
  private unitBoardController: UnitBoardController = new UnitBoardController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-boards/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitBoardController.getAll)

    this.router.post("/unit-boards", isAuth, this.validator("create"), validateFields, this.unitBoardController.create)

    this.router.patch("/unit-boards/units/:unitBoardId", isAuth, this.validator("update"), validateFields, this.unitBoardController.update)
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
        param("unitBoardId").trim().isUUID().notEmpty().withMessage("enter valid unit bedroom Id"),
        body("description").trim().isString().notEmpty().withMessage("entre valid roomCount number"),
      ]
    }
  }
}
