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
class InfoProvider extends index_provider_1.default {
    constructor() {
        super("info");
    }
    create({ body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield db_1.Info.create(body);
            return { info };
        });
    }
    update({ infoId, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield db_1.Info.findByPk(infoId);
            if (!info) {
                (0, error_1.GenerateError)({ message: this._i18n("infoNotFound"), code: 404 });
            }
            info.value = body.value;
            const result = yield info.save();
            return { result };
        });
    }
    list({ limit, page }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitMax = Number(limit) > 50 ? 50 : Number(limit);
            const offset = (Number(page) - 1) * Number(limit);
            const { count, rows } = yield db_1.Info.findAndCountAll({
                limit: limitMax,
                offset: offset,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { data: rows, totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotDataYet"),
                    payload: { data: [], totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getOption({ keys }) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = yield db_1.Info.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: { key: keys },
            });
            const result = { message: "Fetched successfully", payload: { option }, status: "success" };
            return { result };
        });
    }
}
exports.default = InfoProvider;
//# sourceMappingURL=info.provider.js.map