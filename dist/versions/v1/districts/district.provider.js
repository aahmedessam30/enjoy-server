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
class DistrictProvider extends index_provider_1.default {
    constructor() {
        super("district");
    }
    getDistrict({ districtId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield db_1.District.findByPk(districtId);
            if (!district) {
                (0, services_1.GenerateError)({ message: this._i18n("districtNotFound"), code: 404 });
            }
            return { district };
        });
    }
    getDistricts({ currentPage = 0, perPage = 30 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.District.findAndCountAll({
                limit: perPage,
                include: { model: db_1.City, attributes: ["nameAr", "nameEn"] },
                offset: currentPage * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { districts: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotDistrictsYet"),
                    payload: { districts: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getCityDistricts({ cityId, currentPage = 0, perPage = 15 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.District.findAndCountAll({
                limit: perPage,
                include: { model: db_1.City, attributes: ["id", "nameAr", "nameEn"], where: { id: cityId } },
                offset: currentPage * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { districts: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotDistrictsYet"),
                    payload: { districts: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createDistrict({ district }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.District.create({
                nameAr: district.nameAr,
                nameEn: district.nameEn,
                lat: district.lat,
                lng: district.lng,
                cityId: district.cityId,
            });
            return { district: result };
        });
    }
    updateDistrict({ districtId, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield db_1.District.findByPk(districtId);
            if (!district) {
                (0, services_1.GenerateError)({ message: this._i18n("districtNotFound"), code: 404 });
            }
            district.nameAr = data.nameAr;
            district.nameEn = data.nameEn;
            district.lng = data.lng;
            district.lat = data.lat;
            district.cityId = data.cityId;
            const result = yield district.save();
            return { district: result };
        });
    }
}
exports.default = DistrictProvider;
//# sourceMappingURL=district.provider.js.map