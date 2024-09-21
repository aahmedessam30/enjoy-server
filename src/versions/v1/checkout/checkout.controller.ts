import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import CheckoutProvider from "./checkout.provider"
import { ChargeStatus } from "../../../interfaces/charge.interface";

const Checkout = new CheckoutProvider();

export default class ChargeController {
  async getOne (req: Request, res: Response, next: NextFunction) {
    try {
      const { checkout } = await Checkout.getOne({ chargeId: req.params?.chargeId, })
      res.status(200).json({ message: "fetch charge success.", payload: { checkout }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createCheckout (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId
      const { checkout } = await Checkout.createCheckout({ userId, body: req.body, })
      res.status(201).json({ message: "reservation created.", payload: { checkout }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  
  async acceptCheckout (req: Request, res: Response, next: NextFunction) {
    try {
      const chargeId = req.params.chargeId;
      const reservationId = req.params.reservationId;
      const { checkout } = await Checkout.acceptCheckout({ chargeId, reservationId });
      if(checkout?.charge?.status === ChargeStatus.PAID) {
        console.log(`enjoy://pay/1?chargeId=${chargeId}`)
        res.status(200).redirect(`enjoy://pay/1?chargeId=${chargeId}`)
      } else {
        res.status(200).redirect(`enjoy://pay/0`)
      }
    } catch (err) {
      CatchError(err, next)
    }
  }

  async cancelCheckout (req: Request, res: Response, next: NextFunction) {
    try {
      const chargeId = req.params.chargeId;
      const reservationId = req.params.reservationId;
      await Checkout.cancelCheckout({ chargeId, reservationId })
      res.status(200).json({ message: "reservation cancelled!.'", status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
