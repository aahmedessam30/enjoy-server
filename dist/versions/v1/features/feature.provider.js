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
const index_provider_1 = __importDefault(require("../index.provider"));
const db_1 = require("../../../db");
const feature_interface_1 = require("../../../interfaces/feature.interface");
const error_1 = require("../../../services/error");
class FeatureProvider extends index_provider_1.default {
    constructor() {
        super("feature");
    }
    getFeatures() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Feature.findAndCountAll({
                where: { status: feature_interface_1.FeatureStatus.ACTIVE },
                attributes: ['id', 'nameAr', 'nameEn', 'type']
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { features: rows, totalItems: count, },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNoFeatures"),
                    payload: { features: [] },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getFeaturesByType({ featureType }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.Feature.findAndCountAll({
                attributes: ["id", "nameAr", "nameEn"],
                where: { status: feature_interface_1.FeatureStatus.ACTIVE, type: featureType },
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched successfully",
                    payload: { features: rows },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNoFeatures"),
                    payload: { features: [] },
                    status: "success",
                };
            }
            return { result };
        });
    }
    adminGetFeatures({ currentPage = 0, perPage = 10, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (type) {
                filter = Object.assign(filter, { type: type });
            }
            const { count, rows } = yield db_1.Feature.findAndCountAll({
                where: filter,
                limit: perPage,
                offset: currentPage * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched Success",
                    payload: { features: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNoFeatures"),
                    payload: { features: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    findOne({ featureId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const feature = yield db_1.Feature.findByPk(featureId);
            if (!feature) {
                (0, error_1.GenerateError)({ message: this._i18n("featureNotFound"), code: 404 });
            }
            return { feature };
        });
    }
    createFeature(createFeatureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Feature.create(createFeatureDto);
            return { feature: result };
        });
    }
    updateFeature(updateFeatureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const feature = yield db_1.Feature.findByPk(updateFeatureDto.featureId);
            if (!feature) {
                (0, error_1.GenerateError)({ message: this._i18n("featureNotFound"), code: 404 });
            }
            feature.nameAr = updateFeatureDto.nameAr;
            feature.nameEn = updateFeatureDto.nameEn;
            feature.type = updateFeatureDto.type;
            const result = yield feature.save();
            return { feature: result };
        });
    }
    removeFeature({ featureId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const feature = yield db_1.Feature.findByPk(featureId);
            if (!feature) {
                (0, error_1.GenerateError)({ message: this._i18n("featureNotFound"), code: 404 });
            }
            feature.status = feature_interface_1.FeatureStatus.DELETED;
            const result = yield feature.save();
            return { feature: result };
        });
    }
}
exports.default = FeatureProvider;
//# sourceMappingURL=feature.provider.js.map