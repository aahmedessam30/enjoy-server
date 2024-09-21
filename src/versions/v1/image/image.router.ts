import { Router } from "express"
import ImageController from "./image.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import { param, body, check } from "express-validator"
import validateFields from "../../../middlewares/validate-fields"

export default class ImageRouter {
  router: Router
  private imageController: ImageController = new ImageController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    // Add
    this.router.post("/images-module", isAuth, this.validator("add"), validateFields, this.imageController.add)
    // Add
    this.router.post("/images/single", isAuth, this.validator("addSingle"), validateFields, this.imageController.addSingle)
    // Add image from admin
    this.router.post("/admin/images/single", isAdmin, this.validator("addSingle"), validateFields, this.imageController.addSingle)
    // remove
    this.router.delete("/images-module/:imageId", isAuth, this.validator("remove"), validateFields, this.imageController.remove)
  }

  private validator(route: string) {
    if (route == "add") {
      return [
        body("module").notEmpty().isIn(["Unit"]),
        body("moduleId").trim().notEmpty().isUUID(),
        body("images").notEmpty().isArray(),
        check("images.*.type").notEmpty().isIn(["IMAGE", "VIDEO", "3D", "PDF"]),
        check("images.*.url").notEmpty().isString(),
      ]
    } else if (route == "addSingle") {
      return [
        check("type").notEmpty().isIn(["IMAGE", "VIDEO", "3D", "PDF"]),
        check("url").notEmpty().isString(),
      ]
    } else if (route == "remove") {
      return [param("imageId").trim().notEmpty().isUUID()]
    }
  }
}
