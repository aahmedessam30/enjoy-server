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
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const config_1 = require("../config");
class TwilioSMS {
    constructor() {
        this.from = "Darkkom App";
        this.client = new twilio_1.Twilio(config_1.twilioConfig.ACCOUT_SID, config_1.twilioConfig.AUTH_TOKEN);
    }
    send({ to, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.messages
                .create({
                body: body,
                to: to,
                from: this.from,
            })
                .then((message) => {
                return message;
            })
                .catch((e) => console.log(e));
        });
    }
}
exports.default = TwilioSMS;
//# sourceMappingURL=twilio-sms.js.map