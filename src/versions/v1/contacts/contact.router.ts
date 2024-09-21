import { Router } from "express"
import ContactController from "./contact.controller"
import { isAdmin } from "../../../middlewares/auth.old"
import { body } from "express-validator"
import validateFields from "../../../middlewares/validate-fields"

export default class ContactRouter {
  router: Router
  private contactController = new ContactController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/", isAdmin, this.contactController.list)

    this.router.post("/", this.validator("create"), validateFields, this.contactController.create)

    this.router.delete("/", isAdmin, this.contactController.remove)
  }
  private validator(route: string) {
    if (route == "create") {
      return [
        body("mobile").trim().isMobilePhone('any').withMessage("entre valid mobile."),
        body("message").trim().optional().isString().withMessage("entre valid message."),
        body("email").trim().optional().isEmail().withMessage("entre valid email."),
        body("name").trim().isString().withMessage("entre valid name."),
      ]
    } 
  }
}
