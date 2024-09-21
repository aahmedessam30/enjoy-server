import { Router } from "express"
import { body, param, query } from "express-validator"
import UnitController from "./unit.controller"
import { isAdmin, isAuth, isHostAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"

export default class UnitRouter {
  router: Router
  public unitController: UnitController = new UnitController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.get("/units/list", this.validator("list"), validateFields, this.unitController.list)

    this.router.get("/units/host", isHostAuth, this.unitController.getOwnUnits)

    this.router.get("/units/archives", isHostAuth, this.validator("page"), validateFields, this.unitController.getArchiveUnits)

    this.router.post("/units", isAuth, this.validator("create"), validateFields, this.unitController.createUnit)

    this.router.get("/units/check-unit-available/:unitId", isAuth, this.validator("check-available"), validateFields, this.unitController.checkUnitAvailable)

    this.router.patch("/units/:unitId", isAuth, this.validator("update"), validateFields, this.unitController.updateUnit)

    this.router.post("/units/archive/:unitId", isAuth, this.unitController.archiveUnit)

    this.router.get("/admin/units/hosts/:hostId", isAdmin, this.validator("hostId"), validateFields, this.unitController.getHostUnits)

    this.router.get("/admin/units/:unitId", isAdmin, this.validator("id"), validateFields, this.unitController.getUnit)

    this.router.get("/units/:unitId", isAuth, this.validator("id"), validateFields, this.unitController.getUnit)

    this.router.post("/admin/units", isAdmin, this.validator("adminCreate"), validateFields, this.unitController.createUnit)
  }

  private validator(route: string) {
    if (route == "id") {
      return [param("unitId").trim().notEmpty().isUUID().withMessage("unit id not valid")]
    } else if (route == "hostId") {
      return [param("hostId").trim().notEmpty().isUUID().withMessage("host id not valid")]
    } else if (route == "check-available") {
      return [
        param("unitId").trim().notEmpty().isUUID().withMessage("unit id is not valid"),
        query("checkIn").trim().notEmpty().isString().withMessage("check in is not valid"),
        query("checkOut").trim().notEmpty().isString().withMessage("check out is not valid")
      ]
    } else if (route == "create") {
      return [
        body("categoryId").trim().notEmpty().isUUID().withMessage("should select category of the unit"),
        body("space").trim().isString().notEmpty().withMessage("entre valid space."),
        body("details").trim().isString().notEmpty().withMessage("entre valid description of the unit."),
        body("platform").isString(),
        body("appVersion").isString(),
        body("priceByDay").trim().isDecimal().withMessage("entre valid price of the unit."),
      ]
    } else if (route == "adminCreate") {
      return [
        body("categoryId").trim().notEmpty().isUUID().withMessage("should select category of the unit"),
        body("userId").trim().notEmpty().isUUID().withMessage("host id not found"),
        body("space").trim().isString().notEmpty().withMessage("entre valid space."),
        body("details").trim().isString().notEmpty().withMessage("entre valid description of the unit."),
        body("platform").isString(),
        body("appVersion").isString(),
        body("priceByDay").trim().isDecimal().withMessage("entre valid price of the unit."),
      ]
    } else if (route == "update") {
      return [
        body("space").trim().optional().isString().withMessage("entre valid space."),
        body("details").trim().optional().isString().withMessage("entre valid description of the unit."),
        body("appVersion").optional().isString(),
        body("priceByDay").optional().isDecimal().withMessage("entre valid price of the unit."),
      ]
    } else if (route == "list") {
      return [
        query("currentPage").optional({ checkFalsy: true }).isInt(),
        query("currentPage").default(1),
        query("perPage").optional({ checkFalsy: true }).isInt(),
        query("perPage").default(25),
        query("categoryId").optional({ checkFalsy: true }).isUUID(),
        query("minPrice").optional({ checkFalsy: true }).isDecimal(),
        query("maxPrice").optional({ checkFalsy: true }).isDecimal(),
        query("cityId").optional({ checkFalsy: true }).isUUID(),
        query("regionId").optional({ checkFalsy: true }).isUUID(),
        query("lng").optional({ checkFalsy: true }).isDecimal(),
        query("lat").optional({ checkFalsy: true }).isDecimal(),
      ]
    } else if (route == "page") {
      return [
        query("currentPage").optional({ checkFalsy: true }).isInt(),
        query("currentPage").default(1),
        query("perPage").optional({ checkFalsy: true }).isInt(),
        query("perPage").default(25),
      ]
    } else if (route == "pagination") {
      return [
        query("page").optional({ checkFalsy: true }).isInt(),
        query("page").default(1),
        query("limit").optional({ checkFalsy: true }).isInt(),
        query("limit").default(10),
      ]
    }
  }
}
