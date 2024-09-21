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
class UnitBedroomProvider extends index_provider_1.default {
    constructor() {
        super("unit-bedroom");
    }
    getOne({ unitId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bedroom = yield db_1.UnitBedroom.findOne({
                where: { unitId },
                attributes: ["id", "roomCount", "singleBedCount", "masterBedCount"],
            });
            if (!bedroom) {
                (0, error_1.GenerateError)({ message: this._i18n("bedroomNotFound"), code: 404 });
            }
            return { bedroom };
        });
    }
    create(createUnitBedroomDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const bedroom = yield db_1.UnitBedroom.create(createUnitBedroomDto);
            return { bedroom };
        });
    }
    update({ unitBedroomId, updateBedroomDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bedroom = yield db_1.UnitBedroom.findByPk(unitBedroomId);
            if (!bedroom) {
                (0, error_1.GenerateError)({ message: this._i18n("bedroomNotFound"), code: 404 });
            }
            bedroom.roomCount = updateBedroomDto.roomCount;
            bedroom.singleBedCount = updateBedroomDto.singleBedCount;
            bedroom.masterBedCount = updateBedroomDto.masterBedCount;
            const result = yield bedroom.save();
            return { bedroom: result };
        });
    }
}
exports.default = UnitBedroomProvider;
//# sourceMappingURL=unit-bedroom.provider.js.map