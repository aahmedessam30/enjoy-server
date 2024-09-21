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
const sms_1 = __importDefault(require("../../../../services/sms"));
const services_1 = require("../../../../services/services");
const db_1 = require("../../../../db");
const index_provider_1 = __importDefault(require("../../index.provider"));
const config_1 = require("../../../../config");
class OTPProvider extends index_provider_1.default {
    constructor() {
        super("user");
        this.smsClient = new sms_1.default(config_1.SMSConfig.key, config_1.SMSConfig.secret);
    }
    genrateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    genrateRandomPassword() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    saveOTP({ mobile }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = 2030;
                const userOTP = yield db_1.OTP.findOne({ where: { mobile: mobile } });
                if (!userOTP) {
                    const otp = yield db_1.OTP.create({
                        mobile: mobile,
                        code: code,
                    });
                    return { otp };
                }
                userOTP.code = code;
                const result = yield userOTP.save();
                return { otp: result };
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyOTP({ mobile, otp }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.OTP.findOne({ where: { mobile: mobile } });
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("invalidOTP"), code: 404 });
            }
            if (!((user === null || user === void 0 ? void 0 : user.code) == otp)) {
                (0, services_1.GenerateError)({ message: this._i18n("invalidOTP"), code: 404 });
            }
            return { otp: user };
        });
    }
    forgetPassword({ mobile }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.saveOTP({ mobile });
        });
    }
}
exports.default = OTPProvider;
//# sourceMappingURL=otp.provider.js.map