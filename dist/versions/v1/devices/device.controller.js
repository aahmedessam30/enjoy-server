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
const device_provider_1 = __importDefault(require("./device.provider"));
const Device = new device_provider_1.default();
class DevicesController {
    getDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { device } = yield Device.getDevice({ deviceId: req.params.deviceId });
                res.status(200).json({
                    message: "fetched successfully",
                    payload: { device },
                    status: "success",
                });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getDevices(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 1;
                const perPage = Number(req.query.perPage) || 30;
                const { result } = yield Device.getDevices({ currentPage, perPage });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { device } = yield Device.createDevice({ device: req.body });
                res.status(201).json({ message: "Device created.", payload: { device }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { device } = yield Device.updateDevice({
                    userId: req.userId,
                    data: req.body,
                });
                res.status(201).json({
                    message: "Device updated.",
                    payload: { device },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    removeDevice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Device.removeDevice({
                    token: req.body.token,
                });
                res.status(201).json({
                    message: "Device removed.",
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = DevicesController;
//# sourceMappingURL=device.controller.js.map