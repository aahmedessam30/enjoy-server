import { Router } from "express"
import { param } from "express-validator"
import { isAdmin } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import FeatureController from "./feature.controller"

export default class FeatureRouter {
  router: Router
  private featureController = new FeatureController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/features/types/:featureType", validateFields, this.featureController.getFeaturesByType)

    this.router.get("/features",  validateFields, this.featureController.getFeatures)

    this.router.get("/features/:featureId", this.validator("id"), validateFields, this.featureController.getOne)

    this.router.get("/dashboard/features", validateFields, this.featureController.adminGetFeatures)

    this.router.post("/dashboard/features", isAdmin, validateFields, this.featureController.createFeature)

    this.router.patch("/dashboard/features/:featureId", isAdmin, this.validator("id"), validateFields, this.featureController.updateFeature)

    this.router.delete("/dashboard/features/:featureId", isAdmin, this.validator("id"), validateFields, this.featureController.removeFeature)
  }

  private validator(route: string) {
    if (route == "id") {
      return [
        param("featureId").trim().isUUID().notEmpty(),
      ]
    } 
  }
}
