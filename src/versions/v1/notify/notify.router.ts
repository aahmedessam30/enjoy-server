import { Router } from "express"
import { body, param } from "express-validator"
import { isAdmin } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import NotifyController from "./notify.controller"

export default class NotifyRouter {
  router: Router
  private notifyController: NotifyController = new NotifyController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.post("/all", isAdmin, this.validator("all"), validateFields, this.notifyController.sendNotifyToAll)
    this.router.post("/user/:userId", isAdmin, this.validator("user"), validateFields, this.notifyController.sendNotifyToUser)
  }
  private validator(route: string) {
    if (route == "all") {
      return [body("title").trim().notEmpty().isString(), body("message").trim().notEmpty().isString()]
    } else if (route == "user") {
      return [param("userId").trim().notEmpty().isInt().withMessage("user id is not valid"), body("message").trim().notEmpty().isString()]
    }
  }
}
