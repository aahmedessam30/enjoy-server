import { Router } from "express"
import { body, param, query } from "express-validator"
import { isAdmin } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import InfoController from "./info.controller"

export default class inforouter {
  router: Router
  private infoController: InfoController = new InfoController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    // Create new info
    this.router.post("/", isAdmin, this.validator("create"), validateFields, this.infoController.create)
    // Update info
    this.router.put("/:infoId", isAdmin, this.validator("update"), validateFields, this.infoController.update)
    // Get list with pagination for dashboard
    this.router.get("/", isAdmin, this.validator("list"), validateFields, this.infoController.list)
    // Get info for user
    this.router.get("/options", this.infoController.getInfo)
  }
  private validator(route: string) {
    if (route == "create") {
      return [body("key").trim().notEmpty().isString(), body("value").trim().notEmpty().isString()]
    } else if (route == "update") {
      return [param("infoId").trim().isInt().notEmpty(), body("value").trim().notEmpty().isString()]
    } else if (route == "list") {
      return [
        query("page").optional({ checkFalsy: true }).isInt(),
        query("page").default(1),
        query("limit").optional({ checkFalsy: true }).isInt(),
        query("limit").default(10),
      ]
    }
  }
}
