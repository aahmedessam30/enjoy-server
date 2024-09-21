import { Router } from "express"
import ChargeController from "./charge.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import { body, param } from "express-validator"
import { validate } from "../../../middlewares/validate-fields"

export default class ChargeRouter {
  router: Router
  private chargeController = new ChargeController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/charges/:chargeId", isAuth, validate(this.chains.get), this.chargeController.getCharge)

    this.router.get("/dashboard/charges", isAdmin, this.chargeController.getCharges)

    this.router.post("/charges", isAuth, validate(this.chains.create), this.chargeController.createCharge)

    this.router.patch("/charges/:chargeId/payment", isAuth, validate(this.chains.patch), this.chargeController.updateChargePayment)

    this.router.delete("/charges/:chargeId", isAuth, validate(this.chains.delete), this.chargeController.cancelCharge)
  }
  private chains = {
    get: [
      body("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
    ],
    create: [
      body("promoId").optional().isUUID().withMessage("رمز الكوبون غير صحيح"),
      body("amount").trim().isDecimal().notEmpty().withMessage("entre valid amount value."),
      body("total_amount").trim().isDecimal().notEmpty().withMessage("entre valid amount after discount value."),
      body("vatAmount").trim().isDecimal().notEmpty().withMessage("entre valid vat amount."),
      body("promoAmount").trim().isDecimal().notEmpty().withMessage("entre valid promo code amount."),
      body("unitDiscountAmount").trim().isDecimal().notEmpty().withMessage("entre valid unit discount amount."),
    ],
    patch: [
      param("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
      body("paymentId").trim().notEmpty().isUUID().withMessage("entre valid payment id"),
    ],
    delete: [
      body("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
    ],
  }
}
