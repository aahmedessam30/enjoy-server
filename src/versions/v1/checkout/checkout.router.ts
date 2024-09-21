import { Router } from "express"
import CheckoutController from "./checkout.controller"
import { isAuth, isQueryAuth } from "../../../middlewares/auth.old"
import { body, param, query } from "express-validator"
import { validate } from "../../../middlewares/validate-fields"

export default class CheckoutRouter {
  router: Router
  private checkoutController = new CheckoutController()

  constructor() {
    this.router = Router()
    this.routes()
  }

  private routes() {
    this.router.post("/checkout", isAuth, validate(this.chains.create), this.checkoutController.createCheckout)

    this.router.get("/checkout/:chargeId/:reservationId/accept", isQueryAuth, validate(this.chains.accept), this.checkoutController.acceptCheckout)

    this.router.get("/checkout/:chargeId", isAuth, validate(this.chains.checkout), this.checkoutController.getOne)

    this.router.delete("/checkout/:chargeId/:reservationId/cancel", isAuth, validate(this.chains.delete), this.checkoutController.cancelCheckout)
  }
  private chains = {
    checkout: [
      param("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
    ],
    create: [
      body("promoId").optional().isString().withMessage("الكوبون غير صحيح"),
      body("amount").trim().isDecimal().notEmpty().withMessage("entre valid amount value."),
      body("total_amount").trim().isDecimal().notEmpty().withMessage("entre valid total amount"),
      body("vatAmount").trim().isDecimal().notEmpty().withMessage("entre valid vat amount"),
      body("promoAmount").trim().isDecimal().withMessage("entre valid vat amount"),
      body("unitDiscountAmount").trim().isDecimal().withMessage("entre valid unit discount amount"),
      body("checkIn").trim().isDate().notEmpty().withMessage("entre valid check in date."),
      body("checkOut").trim().isDate().notEmpty().withMessage("entre valid check out date."),
      body("nights").trim().isInt().notEmpty().withMessage("entre valid nights count."),
      body("unitId").trim().isUUID().notEmpty().withMessage("entre valid unit id."),
    ],
    accept: [
      param("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
      param("reservationId").trim().notEmpty().isUUID().withMessage("entre valid reservation id"),
      query("authorization").trim().notEmpty().isJWT().withMessage("autherization not valid"),
    ],
    delete: [
      param("chargeId").trim().notEmpty().isUUID().withMessage("entre valid charge id"),
      param("reservationId").trim().notEmpty().isUUID().withMessage("entre valid reservation id"),
    ],
  }
}
