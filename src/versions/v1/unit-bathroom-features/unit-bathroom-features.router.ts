import { Router } from "express";
import { param, body } from "express-validator";
import { isAuth } from "../../../middlewares/auth.old";
import validateFields from "../../../middlewares/validate-fields";
import UnitFeatureController from "./unit-bathroom-features.controller";

export default class UnitBathroomFeatureRouter {
  router: Router
  private unitFeatureController: UnitFeatureController = new UnitFeatureController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/unit-bathroom-features/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitFeatureController.get)

    this.router.post("/unit-bathroom-features", isAuth, this.validator("create"), validateFields, this.unitFeatureController.addUnitBathroomFeatures)

    this.router.delete("/unit-bathroom-features/:unitBathroomFeatureId", isAuth, this.validator("remove"), validateFields, this.unitFeatureController.remove)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("enter valid unit Id")]
    } else if (route == "create") {
      return [
        body("unitId").trim().isUUID().notEmpty().withMessage("enter valid unit Id"),
        body("bathroomFeatures").isArray(),
      ]
    } else if (route == "remove") {
      return [param("unitBathroomFeatureId").trim().notEmpty().isUUID().withMessage("enter valid unit kitchen feature Id")]
    }
  }
}
