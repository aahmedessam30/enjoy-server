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
const db_1 = require("../../../db");
const index_provider_1 = __importDefault(require("../index.provider"));
class CustomerProvider extends index_provider_1.default {
    constructor() {
        super("customer");
    }
    getCustomer({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield db_1.Customer.findOne({ where: { userId: userId } });
            if (!customer) {
                (0, services_1.GenerateError)({ message: this._i18n("customerNotFound"), code: 404 });
            }
            return { customer };
        });
    }
    getCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Customer.findAndCountAll();
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { customers: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not customers yet.!",
                    payload: { customers: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createCustomer({ userId, createCustomerDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield db_1.Customer.findOne({ where: { userId: userId } });
            if (!customer) {
                const result = yield db_1.Customer.create({
                    givenName: createCustomerDto.givenName,
                    surname: createCustomerDto.surname,
                    email: createCustomerDto.email,
                    nationalId: createCustomerDto.nationalId,
                    userId: userId,
                });
                return { customer: result };
            }
            else {
                customer.givenName = createCustomerDto.givenName;
                customer.surname = createCustomerDto.surname;
                customer.email = createCustomerDto.email;
                customer.nationalId = createCustomerDto.nationalId;
                const result = yield customer.save();
                return { customer: result };
            }
        });
    }
    update({ userId, updateCustomerDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield db_1.Customer.findOne({ where: { userId: userId } });
            if (!customer) {
                (0, services_1.GenerateError)({ message: this._i18n("customerNotFound"), code: 404 });
            }
            else {
                customer.givenName = updateCustomerDto.givenName;
                customer.surname = updateCustomerDto.surname;
                customer.email = updateCustomerDto.email;
                customer.nationalId = updateCustomerDto.nationalId;
                const result = yield customer.save();
                return { customer: result };
            }
        });
    }
}
exports.default = CustomerProvider;
//# sourceMappingURL=customer.provider.js.map