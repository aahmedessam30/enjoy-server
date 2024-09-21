"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base64_js_1 = __importDefault(require("base64-js"));
const request_1 = __importDefault(require("request"));
class SMSClient {
    constructor(app_id, app_sec) {
        this.app_id = app_id;
        this.app_sec = app_sec;
        this.base_url = "https://api-sms.4jawaly.com/api/v1/";
        this.app_hash = base64_js_1.default.fromByteArray(Buffer.from(`${app_id}:${app_sec}`)).toString();
    }
    sendMessage(text, numbers, sender) {
        let messages = { messages: [{ text, numbers: numbers, sender, number_iso: "SA" }] };
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "app_key": this.app_id,
            "app_secret": this.app_sec,
        };
        let url = `${this.base_url}account/area/sms/send`;
        return new Promise((resolve, reject) => {
            request_1.default.post({ url, headers, json: messages }, (error, response, body) => {
                if (error)
                    reject(error);
                else
                    resolve(body);
            });
        });
    }
}
exports.default = SMSClient;
//# sourceMappingURL=sms.js.map