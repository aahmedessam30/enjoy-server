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
const express_validator_1 = require("express-validator");
const services_1 = require("../../../services/services");
const city_provider_1 = __importDefault(require("./city.provider"));
const City = new city_provider_1.default();
class CityController {
    getCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { city } = yield City.getCity({ cityId: req.params.cityId });
                res.status(200).json({ message: "fetched successfully", payload: { city }, status: "success", });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getCities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield City.getCities();
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getDashboardCities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 15;
                const { result } = yield City.getDashboardCities({ currentPage, perPage });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { city } = yield City.createCity({ city: req.body });
                res.status(201).json({ message: "City created.", payload: { city }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cityId = req.params.cityId;
                const { city } = yield City.updateCity({ cityId, data: req.body });
                res.status(201).json({
                    message: "city updated.",
                    payload: { city },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = CityController;
//# sourceMappingURL=city.controller.js.map