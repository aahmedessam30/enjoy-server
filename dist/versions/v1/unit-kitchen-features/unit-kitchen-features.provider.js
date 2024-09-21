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
const error_1 = require("../../../services/error");
const index_provider_1 = __importDefault(require("../index.provider"));
class UnitKitchenFeatureProvider extends index_provider_1.default {
    constructor() {
        super("unit-kitchen-feature");
    }
    getUnitKitchenFeatures({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.UnitKitchenFeature.findAndCountAll({
                attributes: ['id', 'unitId'],
                where: { unitId },
                include: {
                    model: db_1.Feature,
                    attributes: ['id', 'nameAr', 'nameEn'],
                }
            });
            return { features: count > 0 ? rows : [] };
        });
    }
    addUnitKitchenFeatures(createUnitFeatureDto) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const records = (_a = createUnitFeatureDto === null || createUnitFeatureDto === void 0 ? void 0 : createUnitFeatureDto.kitchenFeatures) === null || _a === void 0 ? void 0 : _a.map(e => ({ unitId: createUnitFeatureDto === null || createUnitFeatureDto === void 0 ? void 0 : createUnitFeatureDto.unitId, featureId: e }));
            const unitKitchenFeatures = yield db_1.UnitKitchenFeature.bulkCreate(records);
            return { unitKitchenFeatures };
        });
    }
    remove({ unitKitchenFeatureId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitFeature = yield db_1.UnitKitchenFeature.findByPk(unitKitchenFeatureId);
            if (!unitFeature) {
                (0, error_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            }
            yield unitFeature.destroy();
        });
    }
}
exports.default = UnitKitchenFeatureProvider;
//# sourceMappingURL=unit-kitchen-features.provider.js.map