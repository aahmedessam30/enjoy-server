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
exports.isHostAuth = exports.isQueryAuth = exports.isAuth = exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const config_1 = require("../config");
const user_interface_1 = require("../interfaces/user.interface");
function isAdmin(req, res, next) {
    authorization(req.get("Authorization"), [user_interface_1.UserRole.ADMIN])
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: err, errors: [] });
    });
}
exports.isAdmin = isAdmin;
function isAuth(req, res, next) {
    authorization(req.get("Authorization"), [user_interface_1.UserRole.GUEST])
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: err, errors: [] });
    });
}
exports.isAuth = isAuth;
function isQueryAuth(req, res, next) {
    var _a;
    authorization(`Bearer ${(_a = req.query) === null || _a === void 0 ? void 0 : _a.authorization}`, [user_interface_1.UserRole.GUEST])
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: err, errors: [] });
    });
}
exports.isQueryAuth = isQueryAuth;
function isHostAuth(req, res, next) {
    authorization(req.get("Authorization"), [user_interface_1.UserRole.HOST])
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: err, errors: [] });
    });
}
exports.isHostAuth = isHostAuth;
function authorization(bearerToken, roles = []) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!bearerToken) {
                reject("Not authorized.!!");
            }
            const token = bearerToken.split(" ")[1];
            let decodedToken;
            try {
                decodedToken = jsonwebtoken_1.default.verify(token, config_1.jwtConfig.SECRETKEY);
            }
            catch (e) {
                reject("Not authorized.!");
            }
            if (!decodedToken) {
                reject("Not authorized.!");
            }
            db_1.User.findByPk(decodedToken.userId, { attributes: ["id", "role", "status"] })
                .then((user) => {
                if (user.status != "ACTIVE") {
                    reject("Your account is unavailable.!");
                }
                else if (roles.length > 0 && !roles.includes(user.role)) {
                    reject("You are not authorized for this service.!");
                }
                resolve(decodedToken);
            })
                .catch(() => {
                reject("Error in get your account.!");
            });
        }
        catch (err) {
            reject("Not authorized.!");
        }
    }));
}
//# sourceMappingURL=auth.old.js.map