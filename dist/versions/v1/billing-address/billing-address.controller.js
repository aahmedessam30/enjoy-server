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
const billing_address_provider_1 = __importDefault(require("./billing-address.provider"));
const BillingAddress = new billing_address_provider_1.default();
class BillingAddressController {
    getAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address } = yield BillingAddress.getAddress({ userId: req.userId });
                res.status(200).json({ message: "fetched successfully", payload: { address }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    createAdress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address } = yield BillingAddress.createAdress({ userId: req.userId, createAdressDto: req.body });
                res.status(201).json({ message: "address created.", payload: { address }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = BillingAddressController;
//# sourceMappingURL=billing-address.controller.js.map