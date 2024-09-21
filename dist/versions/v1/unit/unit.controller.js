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
const unit_provider_1 = __importDefault(require("./unit.provider"));
const Unit = new unit_provider_1.default();
class Unitcontroller {
    getUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unit } = yield Unit.getUnit({ unitId: req.params.unitId, userId: req === null || req === void 0 ? void 0 : req.userId });
                res.status(200).json({ message: "fetched success", payload: { unit }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    checkUnitAvailable(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkIn = req.query.checkIn;
                const checkOut = req.query.checkOut;
                const { checkAvailable } = yield Unit.checkUnitAvailable({ unitId: req.params.unitId, checkIn, checkOut });
                res.status(200).json({ message: "check success", payload: { checkAvailable }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterUnitsDto = req.query;
                filterUnitsDto.perPage = Number(req.query.perPage) || 16;
                filterUnitsDto.currentPage = Number(req.query.currentPage) || 1;
                const { result } = yield Unit.list(filterUnitsDto);
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getArchiveUnits(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, perPage } = req.query;
                const { result } = yield Unit.getArchiveUnits({ userId: req.userId, currentPage, perPage, });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getOwnUnits(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Unit.getOwnUnits({
                    userId: req.userId,
                    currentPage: Number((_a = req.query.currentPage) === null || _a === void 0 ? void 0 : _a.toString()),
                    perPage: Number((_b = req.query.perPage) === null || _b === void 0 ? void 0 : _b.toString())
                });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getHostUnits(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Unit.getHostUnits({
                    userId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.hostId,
                    currentPage: Number((_b = req.query.currentPage) === null || _b === void 0 ? void 0 : _b.toString()) || 1,
                    perPage: Number((_c = req.query.perPage) === null || _c === void 0 ? void 0 : _c.toString()) || 15
                });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUnitDto = req.body;
                const { unit } = yield Unit.createUnit(createUnitDto);
                res.status(201).json({ message: "unit created.", payload: { unit }, status: "success", });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unit } = yield Unit.updateUnit({ unitId: req.params.unitId, updateUnitDto: req.body });
                res.status(200).json({
                    message: 'unit updated',
                    payload: { unitId: unit.id },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    archiveUnit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { unitId } = yield Unit.archiveUnit({ unitId: req.params.unitId });
                res.status(200).json({ message: "Unit archived!.'", payload: { unitId }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = Unitcontroller;
//# sourceMappingURL=unit.controller.js.map