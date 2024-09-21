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
const cover_interface_1 = require("../../../interfaces/cover.interface");
const error_1 = require("../../../services/error");
const index_provider_1 = __importDefault(require("../index.provider"));
class CoverProvider extends index_provider_1.default {
    constructor() {
        super("cover");
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.Cover.findAndCountAll({
                attributes: ['id', 'createdAt'],
                where: { status: cover_interface_1.CoverStatus.ACTIVE },
                include: [
                    { model: db_1.Image, attributes: ['id', this.concatImg("url")], },
                ]
            });
            return { covers: count > 0 ? rows : [] };
        });
    }
    create(createCoverDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const cover = yield db_1.Cover.create(createCoverDto);
            return { cover };
        });
    }
    remove({ coverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cover = yield db_1.Cover.findByPk(coverId);
            if (!cover) {
                (0, error_1.GenerateError)({ message: this._i18n("coverNotFound"), code: 404 });
            }
            cover.status = cover_interface_1.CoverStatus.DELETED;
            yield cover.save();
        });
    }
}
exports.default = CoverProvider;
//# sourceMappingURL=cover.provider.js.map