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
class UnitTermProvider extends index_provider_1.default {
    constructor() {
        super("unit-term");
    }
    getAll({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const terms = yield db_1.UnitTerm.findAll({
                where: { unitId },
                attributes: ["id", "description"],
            });
            return { terms: (terms === null || terms === void 0 ? void 0 : terms.length) > 0 ? terms : [] };
        });
    }
    create(createUnitTermDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const term = yield db_1.UnitTerm.create(createUnitTermDto);
            return { term };
        });
    }
    update({ unitTermId, updateTermDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const term = yield db_1.UnitTerm.findByPk(unitTermId);
            if (!term) {
                (0, error_1.GenerateError)({ message: this._i18n("termNotFound"), code: 404 });
            }
            term.description = updateTermDto.description;
            const result = yield term.save();
            return { term: result };
        });
    }
    remove({ unitTermId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const term = yield db_1.UnitTerm.findByPk(unitTermId);
            if (!term) {
                (0, error_1.GenerateError)({ message: this._i18n("termNotFound"), code: 404 });
            }
            yield term.destroy();
        });
    }
}
exports.default = UnitTermProvider;
//# sourceMappingURL=unit-term.provider.js.map