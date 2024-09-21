import { Router } from "express"
import BookmarkController from "./bookmark.controller"
import { isAuth } from "../../../middlewares/auth.old"
import { param, body, query } from "express-validator"
import validateFields from "../../../middlewares/validate-fields"

export default class BookmarkRouter {
  router: Router
  private bookmarkController: BookmarkController = new BookmarkController()
  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    // List
    this.router.get("/unit-bookmarks", isAuth, this.validator("list"), validateFields, this.bookmarkController.list)
    // Add
    this.router.post("/unit-bookmarks", isAuth, this.validator("add"), validateFields, this.bookmarkController.add)
    // remove
    this.router.delete("/unit-bookmarks/:bookmarkId", isAuth, this.validator("remove"), validateFields, this.bookmarkController.remove)
  }
  private validator(route: string) {
    if (route == "add") {
      return [
        body("unitId")
          .trim()
          .notEmpty()
          .isUUID().withMessage('Enter valid unit id'),
      ]
    } else if (route == "list") {
      return [
        query("page").optional({ checkFalsy: true }).isInt(),
        query("page").default(1),
        query("limit").optional({ checkFalsy: true }).isInt(),
        query("limit").default(15),
      ]
    } else if (route == "remove") {
      return [param("bookmarkId").trim().notEmpty().isUUID()]
    }
  }
}
