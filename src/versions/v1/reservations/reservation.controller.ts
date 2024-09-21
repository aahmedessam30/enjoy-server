import { Request, Response, NextFunction } from "express";
import { CatchError } from "../../../services/services";
import ReservationProvider from "./reservation.provider";

const Reservation = new ReservationProvider()

export default class ReservationController {
  async getReservation (req: Request, res: Response, next: NextFunction) {
    try {
      const { reservation } = await Reservation.getReservation(req.params.reservationId)
      res.status(200).json({ message: "fetched successfully", payload: { reservation }, status: "success" })
    } catch (e) {
      CatchError(e, next)
    }
  }

  async getFullReservation (req: Request, res: Response, next: NextFunction) {
    try {
      const { reservation } = await Reservation.getFullReservation(req.params.reservationId)
      res.status(200).json({ message: "fetched successfully", payload: { reservation }, status: "success" })
    } catch (e) {
      CatchError(e, next)
    }
  }

  async countReservations (req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Reservation.countReservations({ userId: req.userId })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getUpcommingReservations (req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Reservation.getUpcommingReservations({ userId: req.userId, paginationDto: req.query });
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getPreviousReservations (req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Reservation.getPreviousReservations({ userId: req.userId, paginationDto: req.query});
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getDashboardReservations(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Reservation.getDashboardReservations({ filterDto: req.query })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async acceptReservation (req: Request, res: Response, next: NextFunction) {
    try {
      const { reservation } = await Reservation.acceptReservation({
        reservationId: req.params.reservationId
      })
      res.status(201).json({ message: "reservation accepted.", payload: { reservation }, status: "success" });
    } catch (err) {
      CatchError(err, next)
    }
  }

  async cancelReservation (req: Request, res: Response, next: NextFunction) {
    try {
      const { reservation } = await Reservation.cancelReservation({
        reservationId: req.params.reservationId
      })
      res.status(201).json({ message: "reservation accepted.", payload: { reservation }, status: "success" });
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createReservation (req: Request, res: Response, next: NextFunction) {
    try {
      const { reservation } = await Reservation.createReservation({
        userId: req.userId,
        createReservationDto: req.body,
      })
      res.status(201).json({ message: "reservation created.", payload: { reservation }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
