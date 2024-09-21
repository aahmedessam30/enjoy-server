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
const express_validator_1 = require("express-validator");
const services_1 = require("../../../services/services");
const district_provider_1 = __importDefault(require("./district.provider"));
const District = new district_provider_1.default();
class DistrictController {
    getDistrict(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { district } = yield District.getDistrict({ districtId: req.params.districtId });
                res.status(200).json({
                    message: "fetched successfully",
                    payload: { district },
                    status: "success",
                });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getDistricts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 30;
                const { result } = yield District.getDistricts({ currentPage, perPage });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getCityDistricts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 15;
                const cityId = req.params.cityId;
                const { result } = yield District.getCityDistricts({ cityId, currentPage, perPage });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createDistrict(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { district } = yield District.createDistrict({ district: req.body });
                res.status(201).json({ message: "District created.", payload: { district }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateDistrict(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { district } = yield District.updateDistrict({
                    districtId: req.params.districtId,
                    data: req.body,
                });
                res.status(201).json({
                    message: "District updated.",
                    payload: { district },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = DistrictController;
//# sourceMappingURL=district.controller.js.map