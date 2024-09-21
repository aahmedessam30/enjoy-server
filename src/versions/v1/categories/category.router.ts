import { Router } from "express"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import { param, body } from "express-validator"
import CategoryController from "./category.controller"
import validateFields from "../../../middlewares/validate-fields"

export default class categoryrouter {
  router: Router
  private categoryController: CategoryController = new CategoryController()
  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/dashboard/categories/:categoryId", isAdmin, this.validator("id"), validateFields, this.categoryController.getCategory)

    this.router.get("/categories", this.categoryController.getCategories)

    this.router.get("/categories-filters", this.categoryController.getCategoriesWithFilters)

    this.router.get("/dashboard/categories", isAdmin, this.categoryController.getDashboardCategories)

    this.router.post("/dashboard/categories", isAuth, this.validator("create"), validateFields, this.categoryController.createCategory)

    this.router.patch("/dashboard/categories/:categoryId", isAdmin, this.validator("update"), validateFields, this.categoryController.updateCategory)

    this.router.post(
      "/dashboard/categories/:categoryId",
      isAdmin,
      this.validator("status"),
      validateFields,
      this.categoryController.updateCategoryStatus,
    )
  }
  private validator(route: string) {
    if (route == "id") {
      return [param("categoryId").notEmpty().isUUID()]
    } else if (route == "create") {
      return [
        body("nameAr").trim().isString().notEmpty().withMessage("name ar is required"),
        body("nameEn").trim().isString().notEmpty().withMessage("name en is required."),
      ]
    } else if (route == "update") {
      return [
        param("categoryId").notEmpty().isUUID(),
        body("nameAr").optional({ checkFalsy: true }).isString(),
        body("nameEn").optional({ checkFalsy: true }).isString(),
      ]
    } else if (route == "status") {
      return [param("categoryId").trim().isUUID().notEmpty(), body("status").isString().notEmpty().withMessage("entre valid status.")]
    }
  }
}
