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
class UnitPoolProvider extends index_provider_1.default {
    constructor() {
        super("unit-pool");
    }
    getUnitPools({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.UnitPool.findAndCountAll({
                attributes: ['id', 'unitId', 'height', 'width', 'length'],
                where: { unitId },
                include: {
                    model: db_1.Pool,
                    attributes: ['id', 'nameAr', 'nameEn'],
                }
            });
            return { unitPools: count > 0 ? rows : [] };
        });
    }
    create(createUnitPoolDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitPool = yield db_1.UnitPool.create(createUnitPoolDto);
            return { unitPool };
        });
    }
    remove({ unitPoolId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitPool = yield db_1.UnitPool.findByPk(unitPoolId);
            if (!unitPool) {
                (0, error_1.GenerateError)({ message: this._i18n("unitNotFound"), code: 404 });
            }
            yield unitPool.destroy();
        });
    }
}
exports.default = UnitPoolProvider;
//# sourceMappingURL=unit-pool.provider.js.map