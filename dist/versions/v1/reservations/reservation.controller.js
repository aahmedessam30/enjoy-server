"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../../services/services");
const reservation_provider_1 = __importDefault(require("./reservation.provider"));
const Reservation = new reservation_provider_1.default();
class ReservationController {
    getReservation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservation } = yield Reservation.getReservation(req.params.reservationId);
                res.status(200).json({ message: "fetched successfully", payload: { reservation }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getFullReservation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservation } = yield Reservation.getFullReservation(req.params.reservationId);
                res.status(200).json({ message: "fetched successfully", payload: { reservation }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    countReservations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Reservation.countReservations({ userId: req.userId });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getUpcommingReservations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Reservation.getUpcommingReservations({ userId: req.userId, paginationDto: req.query });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getPreviousReservations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Reservation.getPreviousReservations({ userId: req.userId, paginationDto: req.query });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getDashboardReservations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Reservation.getDashboardReservations({ filterDto: req.query });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    acceptReservation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservation } = yield Reservation.acceptReservation({
                    reservationId: req.params.reservationId
                });
                res.status(201).json({ message: "reservation accepted.", payload: { reservation }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    cancelReservation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservation } = yield Reservation.cancelReservation({
                    reservationId: req.params.reservationId
                });
                res.status(201).json({ message: "reservation accepted.", payload: { reservation }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createReservation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservation } = yield Reservation.createReservation({
                    userId: req.userId,
                    createReservationDto: req.body,
                });
                res.status(201).json({ message: "reservation created.", payload: { reservation }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = ReservationController;
//# sourceMappingURL=reservation.controller.js.map