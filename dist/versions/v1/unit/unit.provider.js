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
const sequelize_1 = require("sequelize");
const index_provider_1 = __importDefault(require("../index.provider"));
const unit_interface_1 = require("../../../interfaces/unit.interface");
const moment_1 = __importDefault(require("moment"));
const moment_range_1 = require("moment-range");
const reservation_interface_1 = require("../../../interfaces/reservation.interface");
const Moment = (0, moment_range_1.extendMoment)(moment_1.default);
class UnitProvider extends index_provider_1.default {
    constructor() {
        super("unit");
    }
    getUnit({ unitId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isBookmarked = yield db_1.Bookmark.count({ where: { unitId, userId } });
            const unit = yield db_1.Unit.findOne({
                where: { id: unitId },
                include: [
                    {
                        model: db_1.UnitLocation,
                        attributes: ["id", "lat", "lng", "address1"],
                        include: [
                            { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                            { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                        ],
                    },
                    { model: db_1.Category, attributes: ["id", "nameAr", "nameEn"] },
                    { model: db_1.User, attributes: ["id", "name"] },
                    { model: db_1.Image, attributes: ["id", this.concatImg("url")] },
                    {
                        model: db_1.Feature,
                        attributes: ["id", "nameAr", "nameEn"],
                        through: { attributes: [] },
                    },
                    {
                        model: db_1.UnitKitchenFeature,
                        attributes: ["id"],
                        include: [
                            {
                                model: db_1.Feature,
                                attributes: ['id', 'nameAr', 'nameEn'],
                            }
                        ]
                    },
                    {
                        model: db_1.UnitBathroomFeature,
                        attributes: ["id"],
                        include: [
                            {
                                model: db_1.Feature,
                                attributes: ['id', 'nameAr', 'nameEn'],
                            }
                        ]
                    },
                    {
                        model: db_1.UnitPool,
                        attributes: ["id", 'width', 'height', 'length'],
                        include: [
                            {
                                model: db_1.Pool,
                                attributes: ['id', 'nameAr', 'nameEn'],
                            }
                        ]
                    },
                    {
                        model: db_1.UnitBedroom,
                        attributes: ["id", 'roomCount', 'masterBedCount', 'singleBedCount'],
                    },
                    { model: db_1.UnitBoard, attributes: ["id", 'description'] },
                    { model: db_1.UnitTerm, attributes: ["id", 'description'] },
                ],
            });
            if (!unit) {
                (0, services_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            }
            unit.setDataValue('isBookmarked', isBookmarked > 0 ? true : false);
            return { unit };
        });
    }
    checkUnitAvailable({ unitId, checkIn, checkOut }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const start = Moment(checkIn, 'YYYY-MM-DD');
            const end = Moment(checkOut, 'YYYY-MM-DD');
            const rangeOfCheck = (_b = Array.from((_a = Moment === null || Moment === void 0 ? void 0 : Moment.range(start, end)) === null || _a === void 0 ? void 0 : _a.by('day'))) === null || _b === void 0 ? void 0 : _b.map(e => new Date(e === null || e === void 0 ? void 0 : e.format('YYYY-MM-DD')));
            const unit = yield db_1.Unit.findOne({
                where: { id: unitId, status: unit_interface_1.UnitStatus.ACTIVE },
                attributes: ['id', 'status'],
                include: {
                    model: db_1.Reservation,
                    where: {
                        status: reservation_interface_1.ReservationStatus.RESERVED,
                        [sequelize_1.Op.or]: [
                            { checkIn: { [sequelize_1.Op.in]: rangeOfCheck } },
                            { checkOut: { [sequelize_1.Op.in]: rangeOfCheck } }
                        ]
                    }
                }
            });
            let checkAvailable = { available: true };
            if (unit) {
                checkAvailable.available = false;
            }
            return { checkAvailable };
        });
    }
    list(filterUnitsDto) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let filterByLocation = {};
            let filterByAttributes = {};
            let reservedUnitIds = [];
            const startDate = filterUnitsDto.startDate;
            const endDate = filterUnitsDto.endDate;
            const rangeOfCheck = (_b = Array.from((_a = Moment === null || Moment === void 0 ? void 0 : Moment.range(startDate, endDate)) === null || _a === void 0 ? void 0 : _a.by('day'))) === null || _b === void 0 ? void 0 : _b.map(e => new Date(e === null || e === void 0 ? void 0 : e.format('YYYY-MM-DD')));
            if (((_c = filterUnitsDto.categories) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                const cats = (_d = filterUnitsDto === null || filterUnitsDto === void 0 ? void 0 : filterUnitsDto.categories) === null || _d === void 0 ? void 0 : _d.split(',');
                filterByAttributes = Object.assign(filterByAttributes, { categoryId: { [sequelize_1.Op.in]: cats } });
            }
            if ((rangeOfCheck === null || rangeOfCheck === void 0 ? void 0 : rangeOfCheck.length) > 0) {
                const rows = yield db_1.Reservation.findAll({
                    attributes: ['unitId'],
                    where: {
                        status: reservation_interface_1.ReservationStatus.RESERVED,
                        [sequelize_1.Op.or]: [
                            { checkIn: { [sequelize_1.Op.in]: rangeOfCheck } },
                            { checkOut: { [sequelize_1.Op.in]: rangeOfCheck } }
                        ]
                    },
                });
                if (rows) {
                    reservedUnitIds = rows.map((reservation) => reservation === null || reservation === void 0 ? void 0 : reservation.unitId);
                }
                else {
                    reservedUnitIds = [];
                }
            }
            if (filterUnitsDto.minPrice) {
                filterByAttributes = Object.assign(filterByAttributes, { price: { [sequelize_1.Op.gte]: filterUnitsDto.minPrice } });
            }
            if (filterUnitsDto.maxPrice) {
                filterByAttributes = Object.assign(filterByAttributes, { price: { [sequelize_1.Op.lte]: filterUnitsDto.maxPrice } });
            }
            if (filterUnitsDto.cityId) {
                filterByLocation = Object.assign(filterByLocation, { cityId: filterUnitsDto.cityId });
            }
            ;
            if ((reservedUnitIds === null || reservedUnitIds === void 0 ? void 0 : reservedUnitIds.length) > 0) {
                filterByAttributes = Object.assign(filterByAttributes, { id: { [sequelize_1.Op.notIn]: reservedUnitIds } });
            }
            const { count, rows } = yield db_1.Unit.findAndCountAll({
                distinct: true,
                attributes: { 'exclude': ['userId', 'categoryId', 'status'] },
                include: [
                    { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                    { model: db_1.Category, attributes: ["id", "nameAr", "nameEn"] },
                    {
                        model: db_1.UnitLocation,
                        attributes: ["id", "cityId", "districtId"],
                        where: Object.assign({}, filterByLocation),
                        right: true,
                        include: [
                            { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                            { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                        ],
                    },
                ],
                where: Object.assign({ status: unit_interface_1.UnitStatus.ACTIVE }, filterByAttributes),
                order: [["updatedAt", "DESC"]],
                limit: filterUnitsDto.perPage,
                offset: (filterUnitsDto.currentPage - 1) * filterUnitsDto.perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: {
                        units: rows,
                        totalItems: count,
                        currentPage: filterUnitsDto.currentPage,
                        limit: filterUnitsDto.perPage
                    },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not units yet.!",
                    payload: {
                        units: [],
                        totalItems: count,
                        currentPage: filterUnitsDto.currentPage,
                        limit: filterUnitsDto.perPage
                    },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getArchiveUnits({ userId, currentPage, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Unit.findAndCountAll({
                distinct: true,
                attributes: ["id", "titleAr", "titleEn", "details", "priceByDay", "discount", "createdAt", "updatedAt", "status",],
                include: [
                    { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                    { model: db_1.Category, attributes: ["id", "nameAr", "nameEn"] },
                    {
                        model: db_1.UnitLocation,
                        attributes: ["address1"],
                        include: [
                            { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                            { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                        ],
                    },
                ],
                where: { status: unit_interface_1.UnitStatus.ARCHIVE, userId: userId },
                order: [["updatedAt", "DESC"]],
                limit: perPage,
                offset: (currentPage - 1) * perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched archived units successfully",
                    payload: { properties: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not archived units.!",
                    payload: { properties: [], totalItems: 0 },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getOwnUnits({ userId, currentPage = 1, perPage = 15 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Unit.findAndCountAll({
                distinct: true,
                include: [
                    { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                    { model: db_1.Category, attributes: ["id", "nameAr", "nameEn"] },
                    {
                        model: db_1.UnitLocation,
                        attributes: ["id", "address1"],
                        include: [
                            { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                            { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                        ],
                    },
                ],
                where: { userId: userId },
                order: [["updatedAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched units successfully",
                    payload: { units: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not units yet.!",
                    payload: { units: [], totalItems: 0 },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getHostUnits({ userId, currentPage = 1, perPage = 15 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Unit.findAndCountAll({
                distinct: true,
                include: [
                    { model: db_1.Category, attributes: ["id", "nameAr", "nameEn"] },
                ],
                where: { userId: userId },
                order: [["updatedAt", "DESC"]],
                limit: perPage,
                offset: (currentPage - 1) * perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched units successfully",
                    payload: { units: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not units yet.!",
                    payload: { units: [], totalItems: 0 },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createUnit(createUnitDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield db_1.Unit.create(createUnitDto);
            if (!unit) {
                (0, services_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            }
            return { unit };
        });
    }
    updateUnit({ unitId, updateUnitDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield db_1.Unit.findByPk(unitId);
            if (!unit) {
                (0, services_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            }
            updateUnitDto.titleAr && (unit.titleAr = updateUnitDto.titleAr);
            updateUnitDto.titleEn && (unit.titleEn = updateUnitDto.titleEn);
            updateUnitDto.dedicatedTo && (unit.dedicatedTo = updateUnitDto.dedicatedTo);
            updateUnitDto.insurance && (unit.insurance = updateUnitDto.insurance);
            updateUnitDto.details && (unit.details = updateUnitDto.details);
            updateUnitDto.discount && (unit.discount = updateUnitDto.discount);
            updateUnitDto.priceByDay && (unit.priceByDay = updateUnitDto.priceByDay);
            updateUnitDto.space && (unit.space = updateUnitDto.space);
            updateUnitDto.priceByDay && (unit.priceByDay = updateUnitDto.priceByDay);
            updateUnitDto.appVersion && (unit.appVersion = updateUnitDto.appVersion);
            updateUnitDto.bathroomCount && (unit.bathroomCount = updateUnitDto.bathroomCount);
            const result = yield unit.save({ silent: true });
            return { unit: result };
        });
    }
    archiveUnit({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit = yield db_1.Unit.findByPk(unitId);
            if (!unit) {
                (0, services_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            }
            unit.status = unit_interface_1.UnitStatus.ARCHIVE;
            const result = yield unit.save();
            return { unitId: result.id };
        });
    }
}
exports.default = UnitProvider;
//# sourceMappingURL=unit.provider.js.map