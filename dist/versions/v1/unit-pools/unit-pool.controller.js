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
const unit_pool_provider_1 = __importDefault(require("./unit-pool.provider"));
const UnitPool = new unit_pool_provider_1.default();
class UnitPoolController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitPools } = yield UnitPool.getUnitPools({ unitId: req.params.unitId });
                res.status(200).json({ status: "success", payload: { unitPools }, message: "fetch success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUnitPoolDto = req.body;
                const { unitPool } = yield UnitPool.create(createUnitPoolDto);
                res.status(200).json({ message: "created success", payload: { unitPool }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const unitPoolId = req.params.unitPoolId;
                yield UnitPool.remove({ unitPoolId });
                res.status(200).json({ message: "removed success", status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = UnitPoolController;
//# sourceMappingURL=unit-pool.controller.js.map