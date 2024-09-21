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
class BillingAddressProvider extends index_provider_1.default {
    constructor() {
        super("billing-address");
    }
    getAddress({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield db_1.BillingAddress.findOne({ where: { userId: userId } });
            if (!address) {
                (0, services_1.GenerateError)({ message: this._i18n("addressNotFound"), code: 404 });
            }
            return { address };
        });
    }
    createAdress({ createAdressDto, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield db_1.BillingAddress.findOne({ where: { userId: userId } });
            if (!address) {
                const result = yield db_1.BillingAddress.create({
                    street1: createAdressDto.street1,
                    street2: createAdressDto.street2,
                    city: createAdressDto.city,
                    state: createAdressDto.state,
                    postcode: createAdressDto.postcode,
                    userId: userId,
                });
                return { address: result };
            }
            else {
                address.street1 = createAdressDto.street1;
                address.street2 = createAdressDto.street2;
                address.city = createAdressDto.city;
                address.state = createAdressDto.state;
                address.postcode = createAdressDto.postcode;
                const result = yield address.save();
                return { address: result };
            }
        });
    }
}
exports.default = BillingAddressProvider;
//# sourceMappingURL=billing-address.provider.js.map