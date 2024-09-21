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
const pool_provider_1 = __importDefault(require("./pool.provider"));
const poolProvider = new pool_provider_1.default();
class FeatureController {
    getPools(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield poolProvider.getPools();
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
                const { pool } = yield poolProvider.findOne({ poolId: req.params.poolId });
                res.status(200).json({ message: "success", payload: { pool }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    adminGetPools(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 15;
                const { result } = yield poolProvider.adminGetPools({ currentPage, perPage });
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
                const createPoolDto = req.body;
                const { pool } = yield poolProvider.create(createPoolDto);
                res.status(201).json({ message: "pool created.", payload: { pool }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatePoolDto = req.body;
                updatePoolDto.poolId = req.params.poolId;
                const { pool } = yield poolProvider.update(updatePoolDto);
                res.status(200).json({ message: "pool updated.", payload: { pool }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield poolProvider.remove({ poolId: req.params.poolId });
                res.status(201).json({ message: "pool deleted.", status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = FeatureController;
//# sourceMappingURL=pool.controller.js.map