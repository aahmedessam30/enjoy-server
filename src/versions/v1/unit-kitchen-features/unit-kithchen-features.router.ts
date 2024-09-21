import { Router } from "express";
import { param, body } from "express-validator";
import { isAuth } from "../../../middlewares/auth.old";
import validateFields from "../../../middlewares/validate-fields";
import UnitFeatureController from "./unit-kitchen-features.controller";

export default class UnitKitchenFeatureRouter {
  router: Router
  private unitFeatureController: UnitFeatureController = new UnitFeatureController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-kitchen-features/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitFeatureController.get)

    this.router.post("/unit-kitchen-features", isAuth, this.validator("create"), validateFields, this.unitFeatureController.addUnitKitchenFeatures)

    this.router.delete("/unit-kitchen-features/:unitKitchenFeatureId", isAuth, this.validator("remove"), validateFields, this.unitFeatureController.remove)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")]
    } else if (route == "create") {
      return [
        body("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("kitchenFeatures").isArray(),
      ]
    } else if (route == "remove") {
      return [param("unitKitchenFeatureId").trim().notEmpty().isUUID().withMessage("enter valid unit kitchen feature Id")]
    }
  }
}
