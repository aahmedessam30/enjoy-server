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
const request_1 = __importDefault(require("request"));
const config_1 = require("../config");
class YamamahSMS {
    constructor() {
        this.API_URL = "https://api.yamamah.com/SendSMSV2";
    }
    send({ to, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = config_1.yamamahConfig.username;
                const password = config_1.yamamahConfig.password;
                const tagname = config_1.yamamahConfig.tagname;
                const FULL_URL = `${this.API_URL}?username=${username}&password=${password}&Tagname=${tagname}&RecepientNumber=966${to}&Message=${body}&SendDateTime=0&EnableDR=true&SentMessageID=true`;
                (0, request_1.default)(FULL_URL, (error, response, body) => {
                    if (!error && response && response.statusCode === 200) {
                        return "success";
                    }
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = YamamahSMS;
//# sourceMappingURL=yamamah-sms.js.map