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
const db_1 = require("../../../db");
const index_provider_1 = __importDefault(require("../index.provider"));
const reservation_interface_1 = require("../../../interfaces/reservation.interface");
const sequelize_1 = require("sequelize");
class ReservationProvider extends index_provider_1.default {
    constructor() {
        super("reservation");
    }
    getReservation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield db_1.Reservation.findByPk(id);
            if (!reservation) {
                (0, services_1.GenerateError)({ message: this._i18n("reservationNotFound"), code: 404 });
            }
            return { reservation };
        });
    }
    getFullReservation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield db_1.Charge.findOne({
                where: { reservationId: id },
                include: [
                    {
                        model: db_1.Reservation,
                        attributes: ['id', 'reference', 'checkIn', 'checkOut', 'nights'],
                        include: [
                            {
                                model: db_1.Unit,
                                attributes: ['id', 'titleAr', 'titleEn', 'details'],
                                include: [
                                    {
                                        model: db_1.UnitLocation,
                                        attributes: ["id", "lat", "lng", "address1"],
                                        include: [
                                            { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                                            { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                                        ],
                                    },
                                    { model: db_1.Image, attributes: ["id", this.concatImg("url")] },
                                    { model: db_1.UnitTerm, attributes: ["id", 'description'] },
                                ],
                            }
                        ]
                    },
                    {
                        model: db_1.PromoCode,
                        attributes: ['id', 'discount', 'code']
                    }
                ]
            });
            if (!reservation) {
                (0, services_1.GenerateError)({ message: this._i18n("reservationNotFound"), code: 404 });
            }
            return { reservation };
        });
    }
    countReservations({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield db_1.Reservation.count({
                where: { userId, status: reservation_interface_1.ReservationStatus.RESERVED },
            });
            let result;
            if (count > 0) {
                result = {
                    payload: { count },
                    status: "success",
                };
            }
            else {
                result = {
                    payload: { count: 0 },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getUpcommingReservations({ userId, paginationDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.page) || 1;
            const limit = parseInt(paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.limit) || 10;
            const { count, rows } = yield db_1.Reservation.findAndCountAll({
                include: [
                    {
                        model: db_1.Unit,
                        attributes: { 'exclude': ['userId', 'categoryId', 'status'] },
                        include: [
                            { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                            {
                                model: db_1.UnitLocation,
                                attributes: ["id", "cityId", "districtId"],
                                required: true,
                                include: [
                                    { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                                    { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                                ],
                            },
                        ],
                    },
                    {
                        model: db_1.Charge,
                        attributes: ['id', 'total_amount']
                    }
                ],
                where: {
                    userId,
                    status: reservation_interface_1.ReservationStatus.RESERVED,
                    checkIn: {
                        [sequelize_1.Op.gt]: new Date(),
                    }
                },
                order: [["createdAt", "DESC"]],
                offset: (page - 1) * limit,
                limit: limit,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { reservations: rows, totalItems: count, page: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotReservationsYet"),
                    payload: { reservations: [], totalItems: count, page: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getPreviousReservations({ userId, paginationDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.page) || 1;
            const limit = parseInt(paginationDto === null || paginationDto === void 0 ? void 0 : paginationDto.limit) || 10;
            const { count, rows } = yield db_1.Reservation.findAndCountAll({
                include: [
                    {
                        model: db_1.Unit,
                        attributes: { 'exclude': ['userId', 'categoryId', 'status'] },
                        include: [
                            { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                            {
                                model: db_1.UnitLocation,
                                attributes: ["id", "cityId", "districtId"],
                                required: true,
                                include: [
                                    { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                                    { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                                ],
                            },
                        ],
                    },
                    {
                        model: db_1.Charge,
                        attributes: ['id', 'total_amount']
                    }
                ],
                where: {
                    userId,
                    status: reservation_interface_1.ReservationStatus.RESERVED,
                    checkIn: { [sequelize_1.Op.lt]: new Date() }
                },
                order: [["createdAt", "DESC"]],
                offset: (page - 1) * limit,
                limit: limit,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { reservations: rows, totalItems: count, page: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotReservationsYet"),
                    payload: { reservations: [], totalItems: count, page: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getDashboardReservations({ filterDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(filterDto.page) || 0;
            const perPage = parseInt(filterDto.perPage) || 15;
            const { count, rows } = yield db_1.Reservation.findAndCountAll({
                order: [["createdAt", "DESC"]],
                offset: page * perPage,
                limit: perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { reservations: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotReservationsYet"),
                    payload: { reservations: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    acceptReservation({ reservationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield db_1.Reservation.findByPk(reservationId);
            if (!reservation) {
                (0, services_1.GenerateError)({ message: this._i18n("reservationNotFound"), code: 404 });
            }
            reservation.status = reservation_interface_1.ReservationStatus.RESERVED;
            const result = yield reservation.save();
            return { reservation: result };
        });
    }
    cancelReservation({ reservationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield db_1.Reservation.findByPk(reservationId);
            if (!reservation) {
                (0, services_1.GenerateError)({ message: this._i18n("reservationNotFound"), code: 404 });
            }
            reservation.status = reservation_interface_1.ReservationStatus.CANCELLED;
            const result = yield reservation.save();
            return { reservation: result };
        });
    }
    createReservation({ createReservationDto, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Reservation.create({
                checkIn: createReservationDto.checkIn,
                checkOut: createReservationDto.checkOut,
                unitId: createReservationDto.unitId,
                nights: createReservationDto.nights,
                status: reservation_interface_1.ReservationStatus.CREATED,
                userId: userId,
            });
            return { reservation: result };
        });
    }
}
exports.default = ReservationProvider;
//# sourceMappingURL=reservation.provider.js.map