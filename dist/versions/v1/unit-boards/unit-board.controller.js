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
const unit_board_provider_1 = __importDefault(require("./unit-board.provider"));
const UnitBoard = new unit_board_provider_1.default();
class UnitBoardController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { boards } = yield UnitBoard.getAll({ unitId: req.params.unitId });
                res.status(200).json({ status: "success", payload: { boards }, message: "fetch success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUnitBoardDto = req.body;
                const { board } = yield UnitBoard.create(createUnitBoardDto);
                res.status(200).json({ message: "created success", payload: { board }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { board } = yield UnitBoard.update({ unitBoardId: req.params.unitBoardId, updateBoardDto: req.body });
                res.status(200).json({ message: "updated successfully", payload: { board }, status: "success", });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = UnitBoardController;
//# sourceMappingURL=unit-board.controller.js.map