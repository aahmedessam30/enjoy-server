import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import PromoCodeProvider from "./promo-code.provider"

const PromoCode = new PromoCodeProvider()

export default class PromoCodeController {
  async verifyPomoCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = await PromoCode.verifyPromoCode({ code: req.params.code })
      res.status(200).json({ message: "verified", payload: { code }, status: "success" })
    } catch (e) {
      CatchError(e, next)
    }
  }
  async createPromoCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { promo } = await PromoCode.createPromoCode({ createPromoDto: req.body, })
      res.status(201).json({ message: "created success.", payload: { promo }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * List promo codes with pagination method
   * @param {query} req limit, page & filters
   * @param {*} res status 200
   * @param {*} next Catch Error
   */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, page, filters } = req.query
      const { result } = await PromoCode.list({
        limit,
        page,
        filters,
      })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const promoId = req.params.promoId
      const { promoCode } = await PromoCode.findOne({ promoId })
      res.status(200).json({ message: "fetched success.", payload: { promoCode }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await PromoCode.search({ text: req.query.s || "", })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
}
