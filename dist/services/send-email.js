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
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const db_1 = require("../db");
const send_email_interface_1 = require("../interfaces/send-email.interface");
class Email {
    send(to, subject, lang = "fr", template, context, cc, bcc) {
        return new Promise((resolve, reject) => {
            if (to.length < 1)
                return reject({ error: { message: "can not send email to unknown or undefined value" } });
            const transporter = nodemailer_1.default.createTransport(config_1.emailConfig);
            transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(this.hbsOptions(lang)));
            const mail = {
                from: `Darkkom <${config_1.emailConfig.auth.user}>`,
                to,
                subject,
                template,
                context,
                cc,
                bcc,
            };
            transporter
                .sendMail(mail)
                .then((result) => {
                storeEmail(result, template, subject, context);
                return resolve(result);
            })
                .catch((error) => {
                transporter.close();
                return reject({ mail: error });
            });
        });
    }
    sendUserId(userId, subject, lang = "ar", template, args, cc, bcc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userMail = yield db_1.User.findByPk(userId, { attributes: ["email"] });
                this.send([userMail.email], subject, lang, template, args, cc, bcc).catch((e) => console.log(e));
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    hbsOptions(lang) {
        return {
            viewEngine: {
                extname: ".hbs",
                layoutsDir: path_1.default.join(__dirname, `../../assets/email-template/${lang}`),
                partialsDir: path_1.default.join(__dirname, `../../assets/email-template/${lang}/partials`),
                defaultLayout: "",
            },
            viewPath: path_1.default.join(__dirname, `../../assets/email-template/${lang}`),
            extName: ".hbs",
        };
    }
}
exports.default = Email;
function storeEmail(result, template, subject, context) {
    try {
        const acceptedUsers = result.accepted.map((email) => {
            return { email, template, subject, context, status: send_email_interface_1.EmailStatus.ACCEPTED };
        });
        const rejectedUsers = result.rejected.map((email) => {
            return { email, template, subject, context, status: send_email_interface_1.EmailStatus.REJECTED };
        });
        db_1.SendEmail.bulkCreate([...acceptedUsers, ...rejectedUsers]);
    }
    catch (error) { }
}
//# sourceMappingURL=send-email.js.map