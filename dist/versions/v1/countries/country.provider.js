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
class CountryProvider extends index_provider_1.default {
    constructor() {
        super("country");
    }
    getCity({ countryId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const country = yield db_1.Country.findByPk(countryId);
            if (!country) {
                (0, services_1.GenerateError)({ message: this._i18n("countryNotFound"), code: 404 });
            }
            return { country };
        });
    }
    getCountries({ currentPage = 1, perPage = 30 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Country.findAndCountAll({
                attributes: ['id', 'nameAr', 'nameEn', 'code'],
                limit: perPage,
                offset: (currentPage - 1) * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { countries: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("ThereNotCountriesYet"),
                    payload: { countries: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getCountry(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const country = yield db_1.Country.findByPk(countryId, { attributes: { exclude: ["createdAt", "updatedAt"] } });
            if (!country) {
                (0, services_1.GenerateError)({ message: this._i18n("countryNotFound"), code: 404 });
            }
            return { country };
        });
    }
    getDashboardCountries({ currentPage = 0, perPage = 30 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Country.findAndCountAll({
                limit: perPage,
                offset: (currentPage - 1) * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { countries: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("ThereNotCountriesYet"),
                    payload: { countries: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createCountry({ country }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Country.create({
                nameAr: country.nameAr,
                nameEn: country.nameEn,
                code: country.code,
            });
            return { country: result };
        });
    }
    updateCountry({ countryId, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const country = yield db_1.Country.findByPk(countryId);
            if (!country) {
                (0, services_1.GenerateError)({ message: this._i18n("countryNotFound"), code: 404 });
            }
            country.nameAr = data.nameAr;
            country.nameEn = data.nameEn;
            country.code = data.code;
            const result = yield country.save();
            return { country: result };
        });
    }
}
exports.default = CountryProvider;
//# sourceMappingURL=country.provider.js.map