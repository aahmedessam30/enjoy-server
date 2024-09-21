import ReservationController from "./reservation.controller"
import { isAdmin, isAuth } from "../../../middlewares/auth.old"
import { body, param } from "express-validator"
import { Router } from "express"
import validateFields from "../../../middlewares/validate-fields"

export default class ReservationRouter {
  router: Router
  private reservationController = new ReservationController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    // Upcomming Reservations Route
    this.router.get("/reservations/upcomming", isAuth, validateFields, this.reservationController.getUpcommingReservations)

    // Previous Reservations Route
    this.router.get("/reservations/previous", isAuth, validateFields, this.reservationController.getPreviousReservations)
    
    // All Reservations Count Route
    this.router.get("/reservations/count", isAuth, validateFields, this.reservationController.countReservations)

    // Accept Reservation Route
    this.router.post(
      "/reservations/:reservationId/accept",
      [body("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id.")], 
      isAuth, validateFields, this.reservationController.acceptReservation
    )

    // Cancel Reservation Route
    this.router.post(
      "/reservations/:reservationId/cancel", isAuth,
      [param("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id."),],
      validateFields, this.reservationController.cancelReservation
    )

    this.router.get(
      "/reservations/:reservationId/full",
      isAuth, 
      [param("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id."),]
      ,
      validateFields,
      this.reservationController.getFullReservation
    )

    this.router.get(
      "/reservations/:reservationId",
      isAuth, 
      [param("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id."),]
      ,
      validateFields,
      this.reservationController.getReservation
    )
    
    this.router.get("/dashboard/reservations", isAdmin, validateFields, this.reservationController.getDashboardReservations)

    this.router.post(
      "/reservations",
      isAuth,
      [
        body("checkIn").trim().isDate().notEmpty().withMessage("entre valid check in date."),
        body("checkOut").trim().isDate().notEmpty().withMessage("entre valid check out date."),
        body("nights").trim().isInt().notEmpty().withMessage("entre valid nights count."),
        body("unitId").trim().isUUID().notEmpty().withMessage("entre valid unit id."),
      ],
      validateFields,
      this.reservationController.createReservation,
    )
  }
  private validator(route: string) {}
}
