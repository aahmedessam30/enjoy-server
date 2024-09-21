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
const rated_city_provider_1 = __importDefault(require("./rated-city.provider"));
const RatedCity = new rated_city_provider_1.default();
class RatedCityController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rated_cities } = yield RatedCity.getRatedCities();
                res.status(200).json({ status: "success", payload: { rated_cities }, message: "fetch success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    adminGet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getRatedCityDto = req.query;
                getRatedCityDto.perPage = Number(req.query.perPage) || 16;
                getRatedCityDto.currentPage = Number(req.query.currentPage) || 1;
                const { result } = yield RatedCity.adminGetRatedCities(getRatedCityDto);
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createRatedCityDto = req.body;
                const { ratedCity } = yield RatedCity.create(createRatedCityDto);
                res.status(200).json({ message: "created success", payload: { ratedCity }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ratedCityId = req.params.ratedCityId;
                yield RatedCity.remove({ ratedCityId });
                res.status(200).json({ message: "removed success", payload: { ratedCityId }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = RatedCityController;
//# sourceMappingURL=rated-city.controller.js.map