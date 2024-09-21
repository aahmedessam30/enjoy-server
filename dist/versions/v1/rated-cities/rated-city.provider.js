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
const db_1 = require("../../../db");
const reated_city_interface_1 = require("../../../interfaces/reated-city.interface");
const error_1 = require("../../../services/error");
const index_provider_1 = __importDefault(require("../index.provider"));
class RatedCityProvider extends index_provider_1.default {
    constructor() {
        super("rated-city");
    }
    getRatedCities() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.RatedCity.findAndCountAll({
                attributes: ['id', 'rate'],
                where: { status: reated_city_interface_1.RatedCityStatus.ACTIVE },
                include: [
                    { model: db_1.Image, attributes: ['id', this.concatImg('url')] },
                    { model: db_1.City, attributes: ['id', 'nameEn', 'nameAr'] }
                ],
                order: [['rate', 'DESC']]
            });
            return { rated_cities: count > 0 ? rows : [] };
        });
    }
    adminGetRatedCities(getRatedCityDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.RatedCity.findAndCountAll({
                attributes: ['id', 'rate'],
                include: [
                    { model: db_1.Image, attributes: ['id', this.concatImg('url')] },
                    { model: db_1.City, attributes: ['id', 'nameEn', 'nameAr'] }
                ],
                order: [['rate', 'DESC']],
                limit: getRatedCityDto.perPage,
                offset: (getRatedCityDto.currentPage - 1) * getRatedCityDto.perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: {
                        rated_cities: rows,
                        totalItems: count,
                        currentPage: getRatedCityDto.currentPage,
                        limit: getRatedCityDto.perPage
                    },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not rated cities yet.!",
                    payload: {
                        ratec_cities: [],
                        totalItems: count,
                        currentPage: getRatedCityDto.currentPage,
                        limit: getRatedCityDto.perPage
                    },
                    status: "success",
                };
            }
            return { result };
        });
    }
    create(createRatedCityDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const ratedCity = yield db_1.RatedCity.create(createRatedCityDto);
            return { ratedCity };
        });
    }
    remove({ ratedCityId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ratedCity = yield db_1.RatedCity.findByPk(ratedCityId);
            if (!ratedCity) {
                (0, error_1.GenerateError)({ message: this._i18n("cityNotFound"), code: 404 });
            }
            ratedCity.status = reated_city_interface_1.RatedCityStatus.DELETED;
            yield ratedCity.save();
        });
    }
}
exports.default = RatedCityProvider;
//# sourceMappingURL=rated-city.provider.js.map