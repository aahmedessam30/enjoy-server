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
const country_provider_1 = __importDefault(require("./country.provider"));
const Country = new country_provider_1.default();
class CountryController {
    getCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { country } = yield Country.getCountry(req.params.countryId);
                res.status(200).json({
                    message: "fetched successfully",
                    payload: { country },
                    status: "success",
                });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getCountries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 1;
                const perPage = Number(req.query.perPage) || 30;
                const { result } = yield Country.getCountries({ currentPage, perPage });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getDashboardCountries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 1;
                const perPage = Number(req.query.perPage) || 30;
                const { result } = yield Country.getDashboardCountries({ currentPage, perPage });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { country } = yield Country.createCountry({ country: req.body });
                res.status(201).json({ message: "Country created.", payload: { country }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const countryId = req.params.countryId;
                const { country } = yield Country.updateCountry({ countryId, data: req.body });
                res.status(201).json({
                    message: "Country updated.",
                    payload: { country },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = CountryController;
//# sourceMappingURL=country.controller.js.map