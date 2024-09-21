import { Router } from "express"
import { body, param } from "express-validator"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import PoolController from "./pool.controller"

export default class PoolRouter {
  router: Router
  private poolController = new PoolController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/pools", validateFields, this.poolController.getPools)

    this.router.get("/pools/:poolId", this.validator("id"), validateFields, this.poolController.getOne)

    this.router.get("/dashboard/pools", isAdmin, validateFields, this.poolController.adminGetPools)

    this.router.post("/dashboard/pools", isAdmin, this.validator('create'), validateFields, this.poolController.create)

    this.router.patch("/dashboard/pools/:poolId", isAdmin, this.validator("id"), validateFields, this.poolController.update)

    this.router.delete("/dashboard/pools/:poolId", isAdmin, this.validator("id"), validateFields, this.poolController.remove)
  }

  private validator(route: string) {
    if (route == "id") {
      return [
        param("poolId").trim().isUUID().notEmpty(),
      ]
    } else if (route == "create") {
      return [
        body("nameAr").trim().isString().notEmpty(),
        body("nameEn").trim().isString().notEmpty(),
      ]
    } 
  }
}
