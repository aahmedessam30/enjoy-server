import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import ChargeProvider from "./charge.provider"

const Charge = new ChargeProvider()

export default class ChargeController {
  async getCharge (req: Request, res: Response, next: NextFunction) {
    try {
      const { charge } = await Charge.getCharge(req.params.chargeId)
      res.status(200).json({ message: "fetched successfully", payload: { charge }, status: "success" })
    } catch (e) {
      CatchError(e, next)
    }
  }
  async getCharges(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Charge.getCharges({ filterDto: req.query })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async createCharge (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId
      const { charge } = await Charge.createCharge({
        userId,
        body: req.body,
      })
      res.status(201).json({ message: "charge created.", payload: { charge }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async updateChargePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const chargeId = req.params.chargeId
      const { charge } = await Charge.updateChargePayment({
        chargeId,
        updateChargeDto: req.body,
      })
      res.status(201).json({ 
        message: "charge updated.",
        payload: { 
          chargeId: charge?.id, 
          payment_id: charge?.payment_id 
        }, 
        status: "success" 
      })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async cancelCharge (req: Request, res: Response, next: NextFunction) {
    try {
      await Charge.cancelCharge({ chargeId: req.params.chargeId })
      res.status(200).json({ message: "charge deleted!.'", status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
