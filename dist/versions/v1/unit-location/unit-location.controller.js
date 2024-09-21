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
const unit_location_provider_1 = __importDefault(require("./unit-location.provider"));
const UnitLocation = new unit_location_provider_1.default();
class UnitLocationController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { location } = yield UnitLocation.getUnitLocation({ unitId: req.params.unitId });
                res.status(200).json({ status: "success", payload: { location }, message: "fetch success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createUnitLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUnitLocationDto = req.body;
                createUnitLocationDto.address1 = req.body.location;
                const { location } = yield UnitLocation.createUnitLocation(createUnitLocationDto);
                res.status(200).json({ message: "created success", payload: { location }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { location } = yield UnitLocation.updateUnitLocation({
                    unitId: req.params.unitId,
                    updateLocationDto: req.body,
                });
                res.status(200).json({
                    message: "updated successfully",
                    payload: { location },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = UnitLocationController;
//# sourceMappingURL=unit-location.controller.js.map