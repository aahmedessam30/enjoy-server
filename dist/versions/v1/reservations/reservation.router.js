"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_controller_1 = __importDefault(require("./reservation.controller"));
const auth_old_1 = require("../../../middlewares/auth.old");
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
class ReservationRouter {
    constructor() {
        this.reservationController = new reservation_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/reservations/upcomming", auth_old_1.isAuth, validate_fields_1.default, this.reservationController.getUpcommingReservations);
        this.router.get("/reservations/previous", auth_old_1.isAuth, validate_fields_1.default, this.reservationController.getPreviousReservations);
        this.router.get("/reservations/count", auth_old_1.isAuth, validate_fields_1.default, this.reservationController.countReservations);
        this.router.post("/reservations/:reservationId/accept", [(0, express_validator_1.body)("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id.")], auth_old_1.isAuth, validate_fields_1.default, this.reservationController.acceptReservation);
        this.router.post("/reservations/:reservationId/cancel", auth_old_1.isAuth, [(0, express_validator_1.param)("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id."),], validate_fields_1.default, this.reservationController.cancelReservation);
        this.router.get("/reservations/:reservationId/full", auth_old_1.isAuth, [(0, express_validator_1.param)("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id."),], validate_fields_1.default, this.reservationController.getFullReservation);
        this.router.get("/reservations/:reservationId", auth_old_1.isAuth, [(0, express_validator_1.param)("reservationId").trim().isUUID().notEmpty().withMessage("entre valid reservation id."),], validate_fields_1.default, this.reservationController.getReservation);
        this.router.get("/dashboard/reservations", auth_old_1.isAdmin, validate_fields_1.default, this.reservationController.getDashboardReservations);
        this.router.post("/reservations", auth_old_1.isAuth, [
            (0, express_validator_1.body)("checkIn").trim().isDate().notEmpty().withMessage("entre valid check in date."),
            (0, express_validator_1.body)("checkOut").trim().isDate().notEmpty().withMessage("entre valid check out date."),
            (0, express_validator_1.body)("nights").trim().isInt().notEmpty().withMessage("entre valid nights count."),
            (0, express_validator_1.body)("unitId").trim().isUUID().notEmpty().withMessage("entre valid unit id."),
        ], validate_fields_1.default, this.reservationController.createReservation);
    }
    validator(route) { }
}
exports.default = ReservationRouter;
//# sourceMappingURL=reservation.router.js.map