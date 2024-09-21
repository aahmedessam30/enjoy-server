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
const info_provider_1 = __importDefault(require("./info.provider"));
const Info = new info_provider_1.default();
class InfoController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { info } = yield Info.create({
                    body: req.body,
                });
                res.status(201).json({ message: "Info created.", payload: { info }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Info.update({
                    infoId: req.params.infoId,
                    body: req.body,
                });
                res.status(200).json({ message: "info updated.", payload: { result }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Info.list({
                    limit: req.query.limit,
                    page: req.query.page,
                });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = String(req.query.keys).split(",");
                const { result } = yield Info.getOption({ keys });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = InfoController;
//# sourceMappingURL=info.controller.js.map