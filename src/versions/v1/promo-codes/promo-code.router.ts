import { Router } from "express"
import PromoCodeController from "./promo-code.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import { body, param, query } from "express-validator"
import validateFields from "../../../middlewares/validate-fields"

export default class PromoCodeRouter {
  router: Router
  private promoCode: PromoCodeController = new PromoCodeController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/promo-codes/:code", isAuth, this.validator("verify"), validateFields, this.promoCode.verifyPomoCode)
    // Create new promo code
    this.router.post("/dashboard/promo-codes", isAdmin, this.validator("create"), validateFields, this.promoCode.createPromoCode)
    // Get list with pagination for dashboard
    this.router.get("/promo/dashboard", isAdmin, this.validator("list"), validateFields, this.promoCode.list)
    // search promo code
    this.router.get("/dashboard/promo/search", isAdmin, this.promoCode.search)
    // Get one
    this.router.get("/promo/dashboard/:promoId", isAdmin, this.validator("findOne"), validateFields, this.promoCode.findOne)
  }
  private validator(route: string) {
    if (route == "verify") {
      return [
        param("code").trim().notEmpty().withMessage("رمز الكوبون غير صحيح").isString().withMessage("رمز الكوبون غير صحيح"),
        query("type").trim().notEmpty().isIn(["UNITS"]).withMessage("entre valid code type"),
      ]
    } else if (route == "create") {
      return [
        body("code").trim().notEmpty().isString().withMessage("entre valid code"),
        body("discount").trim().notEmpty().isNumeric().withMessage("entre valid discount"),
        body("expireDate").optional({ checkFalsy: true }).isISO8601().toDate(),
        body("type").trim().notEmpty().isIn(["UNITS"]).withMessage("entre valid code type"),
      ]
    }  else if (route == "list") {
      return [
        query("page").optional({ checkFalsy: true }).isInt(),
        query("page").default(1),
        query("limit").optional({ checkFalsy: true }).isInt(),
        query("limit").default(10),
      ]
    } else if (route == "findOne") {
      return [param("promoId").trim().notEmpty().isUUID()]
    }
  }
}
