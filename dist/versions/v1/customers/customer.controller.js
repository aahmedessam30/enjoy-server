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
const customer_provider_1 = __importDefault(require("./customer.provider"));
const Customer = new customer_provider_1.default();
class CustomerController {
    getCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer } = yield Customer.getCustomer({ userId: req.userId });
                res.status(200).json({ message: "fetched successfully", payload: { customer }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    createCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer } = yield Customer.createCustomer({ userId: req.userId, createCustomerDto: req.body });
                res.status(201).json({ message: "customer created.", payload: { customer }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Customer.update({ userId: req.userId, updateCustomerDto: req.body });
                res.status(201).json({ message: "customer updated." });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = CustomerController;
//# sourceMappingURL=customer.controller.js.map