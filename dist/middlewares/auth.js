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
const db_1 = require("../db");
const token_1 = require("../services/token");
function admin(req, res, next) {
    authorization(req.get("Authorization"), ["ADMIN"])
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: "Unauthorized", errors: [{ msg: err.message }] });
    });
}
function investor(req, res, next) {
    authorization(req.get("Authorization"), ["ADMIN", "INVESTOR"])
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: "Unauthorized", errors: [{ msg: err.message }] });
    });
}
function user(req, res, next) {
    authorization(req.get("Authorization"))
        .then((data) => {
        req.userId = data.userId;
        next();
    })
        .catch((err) => {
        res.status(401).json({ message: "Unauthorized", errors: [{ msg: err.message }] });
    });
}
function authorization(accessToken, roles = []) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const token = accessToken.split(" ")[1];
            if (!accessToken || !token) {
                reject({ message: "Not authorized.!" });
            }
            (0, token_1.verifyAccessToken)(token)
                .then((payload) => {
                db_1.User.findByPk(payload.userId, { attributes: ["id", "role", "status"] })
                    .then((user) => {
                    if (user.status != "ACTIVE") {
                        reject({ message: "Your account is unavailable.!" });
                    }
                    else if (roles.length > 0 && !roles.includes(user.role)) {
                        reject({ message: "You are not authorized for this service.!" });
                    }
                    resolve(payload);
                })
                    .catch(() => reject({ message: "Error in get your account.!" }));
            })
                .catch((e) => reject(e));
        }
        catch (err) {
            reject({ message: "Not authorized.!" });
        }
    }));
}
exports.default = { admin, user, investor };
//# sourceMappingURL=auth.js.map