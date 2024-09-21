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
const error_1 = require("../../../services/error");
const db_1 = require("../../../db");
const index_provider_1 = __importDefault(require("../index.provider"));
class UnitLocationProvider extends index_provider_1.default {
    constructor() {
        super("unit-location");
    }
    getUnitLocation({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield db_1.UnitLocation.findOne({
                where: { unitId },
                attributes: ["id", "lat", "lng", "address1"],
                include: [
                    { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                    { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                ],
            });
            if (!location) {
                (0, error_1.GenerateError)({ message: this._i18n("locationNotFound"), code: 404 });
            }
            return { location };
        });
    }
    createUnitLocation(createUnitLocationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield db_1.UnitLocation.create(createUnitLocationDto);
            return { location };
        });
    }
    updateUnitLocation({ unitId, updateLocationDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield db_1.UnitLocation.findOne({
                where: { unitId },
            });
            if (!location) {
                (0, error_1.GenerateError)({ message: this._i18n("locationNotFound"), code: 404 });
            }
            location.lng = updateLocationDto.lng;
            location.lat = updateLocationDto.lat;
            location.address1 = updateLocationDto.location;
            location.cityId = updateLocationDto.cityId;
            location.districtId = updateLocationDto.districtId;
            const result = yield location.save();
            return { location: result };
        });
    }
}
exports.default = UnitLocationProvider;
//# sourceMappingURL=unit-location.provider.js.map