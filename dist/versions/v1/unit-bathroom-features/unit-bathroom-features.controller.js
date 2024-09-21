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
const unit_bathroom_features_provider_1 = __importDefault(require("./unit-bathroom-features.provider"));
const UnitBathroomFeature = new unit_bathroom_features_provider_1.default();
class UnitBathroomFeatureController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { features } = yield UnitBathroomFeature.getUnitBathroomFeatures({ unitId: req.params.unitId });
                res.status(200).json({ status: "success", payload: { unitBathroomFeatures: features }, message: "fetch success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    addUnitBathroomFeatures(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUnitBathroomFeatureDto = req.body;
                const { unitBathroomFeatures } = yield UnitBathroomFeature.addUnitBathroomFeatures(createUnitBathroomFeatureDto);
                res.status(200).json({ message: "created success", payload: { unitBathroomFeatures }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unitBathroomFeatureId = req.params.unitBathroomFeatureId;
                yield UnitBathroomFeature.remove({ unitBathroomFeatureId });
                res.status(200).json({ message: "removed success", status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = UnitBathroomFeatureController;
//# sourceMappingURL=unit-bathroom-features.controller.js.map