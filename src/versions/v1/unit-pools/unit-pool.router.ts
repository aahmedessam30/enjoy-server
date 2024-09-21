import { Router } from "express";
import { param, body } from "express-validator";
import { isAuth } from "../../../middlewares/auth.old";
import validateFields from "../../../middlewares/validate-fields";
import UnitPoolController from "./unit-pool.controller";

export default class UnitPoolRouter {
  router: Router
  private unitPoolController: UnitPoolController = new UnitPoolController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-pools/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitPoolController.get)

    this.router.post("/unit-pools", isAuth, this.validator("create"), validateFields, this.unitPoolController.create)

    this.router.delete("/unit-pools/:unitPoolId", isAuth, this.validator("remove"), validateFields, this.unitPoolController.remove)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")]
    } else if (route == "create") {
      return [
        body("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("poolId").trim().isUUID().notEmpty().withMessage("enter valid pool Id"),
        body("length").trim().notEmpty().isInt().withMessage("enter valid length"),
        body("height").trim().notEmpty().isInt().withMessage("enter valid height"),
        body("width").trim().notEmpty().isInt().withMessage("enter valid width"),
      ]
    } else if (route == "remove") {
      return [param("unitBathroomFeatureId").trim().notEmpty().isUUID().withMessage("enter valid unit kitchen feature Id")]
    }
  }
}
