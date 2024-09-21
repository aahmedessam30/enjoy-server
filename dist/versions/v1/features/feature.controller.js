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
const feature_interface_1 = require("../../../interfaces/feature.interface");
const services_1 = require("../../../services/services");
const feature_provider_1 = __importDefault(require("./feature.provider"));
const Feature = new feature_provider_1.default();
class FeatureController {
    getFeatures(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Feature.getFeatures();
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getFeaturesByType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const featureType = req.params.featureType || feature_interface_1.FeatureType.GENERAL;
                const { result } = yield Feature.getFeaturesByType({ featureType });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { feature } = yield Feature.findOne({ featureId: req.params.featureId });
                res.status(200).json({ message: "success", payload: { feature }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    adminGetFeatures(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 10;
                const type = req.params.type;
                const { result } = yield Feature.adminGetFeatures({ currentPage, perPage, type });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createFeatureDto = req.body;
                const { feature } = yield Feature.createFeature(createFeatureDto);
                res.status(201).json({ message: "feature created.", payload: { feature }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    updateFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateFeatureDto = req.body;
                updateFeatureDto.featureId = req.params.featureId;
                const { feature } = yield Feature.updateFeature(updateFeatureDto);
                res.status(201).json({ message: "feature updated.", payload: { feature }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    removeFeature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Feature.removeFeature({ featureId: req.params.featureId });
                res.status(201).json({ message: "feature deleted.", status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = FeatureController;
//# sourceMappingURL=feature.controller.js.map