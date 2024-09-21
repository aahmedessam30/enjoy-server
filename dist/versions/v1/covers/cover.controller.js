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
const cover_provider_1 = __importDefault(require("./cover.provider"));
const Cover = new cover_provider_1.default();
class CoverController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { covers } = yield Cover.list();
                res.status(200).json({ status: "success", payload: { covers }, message: "fetch success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createCoverDto = req.body;
                const { cover } = yield Cover.create(createCoverDto);
                res.status(200).json({ message: "created success", payload: { cover }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coverId = req.params.coverId;
                yield Cover.remove({ coverId });
                res.status(200).json({ message: "removed success", payload: { coverId }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = CoverController;
//# sourceMappingURL=cover.controller.js.map