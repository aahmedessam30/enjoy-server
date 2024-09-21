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
exports.verifyAccessToken = exports.verifyRefreshToken = exports.generateAccessToken = exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("./helper");
const refreshTokenKeys = {
    private: (0, helper_1.readFileSyncHelper)("../../assets/keys/refresh-token/private.key"),
    public: (0, helper_1.readFileSyncHelper)("../../assets/keys/refresh-token/public.key"),
};
const accessTokenKeys = {
    private: (0, helper_1.readFileSyncHelper)("../../assets/keys/access-token/private.key"),
    public: (0, helper_1.readFileSyncHelper)("../../assets/keys/access-token/public.key"),
};
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, refreshTokenKeys.private, { algorithm: "RS256", expiresIn: "60 days" });
}
exports.generateRefreshToken = generateRefreshToken;
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, accessTokenKeys.private, { algorithm: "RS256", expiresIn: "7 days" });
}
exports.generateAccessToken = generateAccessToken;
function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, refreshTokenKeys.public, { algorithms: ["RS256"] });
            resolve(decoded);
        }
        catch (ex) {
            reject({ becauseItExpired: ex.message == "jwt expired", message: ex.message });
        }
    }));
}
exports.verifyRefreshToken = verifyRefreshToken;
function verifyAccessToken(token) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, accessTokenKeys.public, { algorithms: ["RS256"] });
            resolve(decoded);
        }
        catch (ex) {
            reject({ becauseItExpired: ex.message == "jwt expired", message: ex.message });
        }
    }));
}
exports.verifyAccessToken = verifyAccessToken;
//# sourceMappingURL=token.js.map