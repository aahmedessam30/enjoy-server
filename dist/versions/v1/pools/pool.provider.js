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
const error_1 = require("../../../services/error");
const pool_interface_1 = require("../../../interfaces/pool.interface");
class PoolProvider extends index_provider_1.default {
    constructor() {
        super("pool");
    }
    getPools() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Pool.findAndCountAll({
                where: { status: pool_interface_1.PoolStatus.ACTIVE },
                attributes: ['id', 'nameAr', 'nameEn'],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched successfully",
                    payload: { pools: rows, totalItems: count, },
                    status: "success",
                };
            }
            else {
                result = { message: this._i18n("thereNoPools"), payload: { pools: [] }, status: "success", };
            }
            return { result };
        });
    }
    findOne({ poolId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield db_1.Pool.findByPk(poolId);
            if (!pool) {
                (0, error_1.GenerateError)({ message: this._i18n("poolNotFound"), code: 404 });
            }
            return { pool };
        });
    }
    adminGetPools({ currentPage, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Pool.findAndCountAll({
                limit: perPage,
                offset: currentPage * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { pools: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNoPools"),
                    payload: { pools: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    create(createPoolDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Pool.create(createPoolDto);
            return { pool: result };
        });
    }
    update(updatePoolDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield db_1.Pool.findByPk(updatePoolDto.poolId);
            if (!pool) {
                (0, error_1.GenerateError)({ message: this._i18n("poolNotFound"), code: 404 });
            }
            pool.nameAr = updatePoolDto.nameAr;
            pool.nameEn = updatePoolDto.nameEn;
            const result = yield pool.save();
            return { pool: result };
        });
    }
    remove({ poolId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield db_1.Pool.findByPk(poolId);
            if (!pool) {
                (0, error_1.GenerateError)({ message: this._i18n("featureNotFound"), code: 404 });
            }
            pool.status = pool_interface_1.PoolStatus.DELETED;
            const result = yield pool.save();
            return { pool: result };
        });
    }
}
exports.default = PoolProvider;
//# sourceMappingURL=pool.provider.js.map