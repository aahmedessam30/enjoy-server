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
const invoice_provider_1 = __importDefault(require("./invoice.provider"));
const Invocie = new invoice_provider_1.default();
class InvocieController {
    getInvocie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { invocie } = yield Invocie.getInvocie(req.params.invocieId);
                res.status(200).json({ message: "fetched successfully", payload: { invocie }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getInvocies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { result } = yield Invocie.getInvocies({ userId: req.userId });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getDashboardInvoices(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { result } = yield Invocie.getDashboardInvoices({ filterDto: req.query });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createInvocie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    (0, services_1.GenerateError)({ message: "Validation Faild", code: 422, errors: errors.array() });
                }
                const { invoice } = yield Invocie.createInvocie({
                    userId: req.userId,
                    createInvocieDto: req.body,
                });
                res.status(201).json({ message: "invoice created.", payload: { invoice }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = InvocieController;
//# sourceMappingURL=invoice.controller.js.map