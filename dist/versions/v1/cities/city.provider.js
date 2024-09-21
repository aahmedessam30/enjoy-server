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
class CityProvider extends index_provider_1.default {
    constructor() {
        super("city");
    }
    getCity({ cityId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield db_1.City.findByPk(cityId);
            if (!city) {
                (0, services_1.GenerateError)({ message: this._i18n("cityNotFound"), code: 404 });
            }
            return { city };
        });
    }
    getCities() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.City.findAndCountAll({
                attributes: ['id', 'nameAr', 'nameEn', 'lat', 'lng'],
                distinct: true,
                include: { model: db_1.District, attributes: ['id', 'nameAr', 'nameEn', 'lat', 'lng', 'cityId'] },
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { cities: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotCitysYet"),
                    payload: { cities: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getDashboardCities({ currentPage, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.City.findAndCountAll({
                include: { model: db_1.Country, attributes: ["nameAr"] },
                limit: perPage,
                offset: currentPage * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { cities: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotCitysYet"),
                    payload: { cities: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createCity({ city }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.City.create({
                nameAr: city.nameAr,
                nameEn: city.nameEn,
                lng: city.lng,
                lat: city.lat,
                countryId: city.countryId,
            });
            return { city: result };
        });
    }
    updateCity({ cityId, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield db_1.City.findByPk(cityId);
            if (!city) {
                (0, services_1.GenerateError)({ message: this._i18n("cityNotFound"), code: 404 });
            }
            city.nameAr = data.nameAr;
            city.nameEn = data.nameEn;
            city.lng = data.lng;
            city.lat = data.lat;
            const result = yield city.save();
            return { city: result };
        });
    }
}
exports.default = CityProvider;
//# sourceMappingURL=city.provider.js.map