import { Router } from "express";
import { param, body } from "express-validator";
import { isAdmin } from "../../../middlewares/auth.old";
import validateFields from "../../../middlewares/validate-fields";
import CoverController from "./cover.controller";

export default class CoverRouter {
  router: Router
  private coverController: CoverController = new CoverController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/covers", validateFields, this.coverController.get)

    this.router.post("/covers", isAdmin, this.validator("create"), validateFields, this.coverController.create)

    this.router.delete("/covers/:coverId", isAdmin, this.validator("remove"), validateFields, this.coverController.remove)
  }

  private validator(route: string) {
    if (route == "create") {
      return [
        body("imageId").trim().isUUID().notEmpty().withMessage("enter valid image Id"),
      ]
    } else if (route == "remove") {
      return [param("coverId").trim().notEmpty().isUUID().withMessage("enter valid cover Id")]
    }
  }
}
