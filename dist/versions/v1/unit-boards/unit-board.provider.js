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
const error_1 = require("../../../services/error");
const db_1 = require("../../../db");
const index_provider_1 = __importDefault(require("../index.provider"));
class UnitBoardProvider extends index_provider_1.default {
    constructor() {
        super("unit-board");
    }
    getAll({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const boards = yield db_1.UnitBoard.findAll({
                where: { unitId },
                attributes: ["id", "description"],
            });
            if (!boards) {
                (0, error_1.GenerateError)({ message: this._i18n("boardNotFound"), code: 404 });
            }
            return { boards };
        });
    }
    create(createUnitBoardDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield db_1.UnitBoard.create(createUnitBoardDto);
            return { board };
        });
    }
    update({ unitBoardId, updateBoardDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield db_1.UnitBoard.findByPk(unitBoardId);
            if (!board) {
                (0, error_1.GenerateError)({ message: this._i18n("boardNotFound"), code: 404 });
            }
            board.description = updateBoardDto.description;
            const result = yield board.save();
            return { board: result };
        });
    }
}
exports.default = UnitBoardProvider;
//# sourceMappingURL=unit-board.provider.js.map