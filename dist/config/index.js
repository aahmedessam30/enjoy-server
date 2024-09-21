"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSConfig = exports.yamamahConfig = exports.s3Config = exports.twilioConfig = exports.appConfig = exports.jwtConfig = exports.emailConfig = exports.dbConfig = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    PORT: process.env.DB_PORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        supportBigNumbers: true,
        decimalNumbers: true,
        bigNumberStrings: false,
    },
};
exports.emailConfig = {
    pool: true,
    host: String(process.env.SMTP_HOST).trim(),
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: String(process.env.SMTP_USERNAME).trim(),
        pass: String(process.env.SMTP_PASSWORD).trim(),
    },
};
exports.jwtConfig = {
    SECRETKEY: process.env.SECRETKEY,
};
exports.appConfig = {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT) || 3000,
};
exports.twilioConfig = {
    ACCOUT_SID: process.env.TWILIO_ACCOUT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
};
exports.s3Config = { accessKeyId: process.env.DA_ACCESS_KEY, secretAccessKey: process.env.DA_SECRET_KEY };
exports.yamamahConfig = {
    username: process.env.YAMAMAH_USER,
    password: process.env.YAMAMAH_PASSWORD,
    tagname: process.env.YAMAMAH_TAGNAME,
};
exports.SMSConfig = {
    key: process.env.SMS_API_KEY,
    secret: process.env.SMS_API_SECRET,
};
//# sourceMappingURL=index.js.map