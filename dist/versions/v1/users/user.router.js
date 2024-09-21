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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("./user.controller"));
const db_1 = require("../../../db");
const auth_old_1 = require("../../../middlewares/auth.old");
const validate_fields_1 = __importDefault(require("../../../middlewares/validate-fields"));
const user_interface_1 = require("../../../interfaces/user.interface");
class UserRouter {
    constructor() {
        this.userController = new user_controller_1.default();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/guest/login", this.validator("guestUserLogin"), validate_fields_1.default, this.userController.loginAsGuest);
        this.router.post("/admin/login", this.validator("adminLogin"), validate_fields_1.default, this.userController.loginAsAdmin);
        this.router.post("/host/login", this.validator("hostUserLogin"), validate_fields_1.default, this.userController.loginAsHost);
        this.router.post("/signup", this.validator("signup"), validate_fields_1.default, this.userController.signup);
        this.router.post("/otp", this.validator("otp"), validate_fields_1.default, this.userController.verifyOTP);
        this.router.get("/users", auth_old_1.isAuth, this.userController.getUser);
        this.router.get("/admin/me", auth_old_1.isAdmin, this.userController.getUser);
        this.router.get("/host/me", auth_old_1.isHostAuth, this.userController.getUser);
        this.router.post("/guest/register", this.validator("createUser"), validate_fields_1.default, this.userController.createGuestUser);
        this.router.post("/host/register", this.validator("createUser"), validate_fields_1.default, this.userController.createHostUser);
        this.router.patch("/users", auth_old_1.isAuth, this.validator("updateUser"), this.userController.updateProfile);
        this.router.post("/forget-password", this.validator("forgetPassword"), validate_fields_1.default, this.userController.forgetPassword);
        this.router.post("/verify", this.validator("otp"), validate_fields_1.default, this.userController.verifyOTP);
        this.router.post("/admin/change-role", auth_old_1.isAuth, this.validator("changeRole"), validate_fields_1.default, this.userController.changeUserRoleToAdmin);
        this.router.get("/admin/users/:userId", auth_old_1.isAdmin, this.validator("getOne"), validate_fields_1.default, this.userController.getUserForAdmin);
        this.router.get("/admin/users", auth_old_1.isAdmin, this.validator("list"), validate_fields_1.default, this.userController.getUsers);
        this.router.post("/admin/host/users", auth_old_1.isAdmin, this.validator("createUser"), validate_fields_1.default, this.userController.createHostWithoutToken);
        this.router.post("/admin/guest/users", auth_old_1.isAdmin, this.validator("createUser"), validate_fields_1.default, this.userController.createGuestWithoutToken);
        this.router.patch("/admin/users/:userId", auth_old_1.isAdmin, this.validator("updateUser"), this.userController.updateUser);
        this.router.patch("/change-password", this.validator("changePassword"), validate_fields_1.default, this.userController.changePassword);
    }
    validator(route) {
        if (route == "guestUserLogin") {
            return [
                (0, express_validator_1.body)("mobile")
                    .trim()
                    .isMobilePhone('any')
                    .notEmpty()
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({
                        where: { mobile: value, status: "ACTIVE", role: user_interface_1.UserRole.GUEST },
                    });
                    if (!userDoc) {
                        return Promise.reject("الحساب غير موجود");
                    }
                })),
                (0, express_validator_1.body)("password").trim().notEmpty().isLength({ min: 5, max: 30 }),
            ];
        }
        else if (route == "hostUserLogin") {
            return [
                (0, express_validator_1.body)("mobile")
                    .trim()
                    .isMobilePhone('any')
                    .notEmpty()
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({
                        where: { mobile: value, status: "ACTIVE", role: user_interface_1.UserRole.HOST },
                    });
                    if (!userDoc) {
                        return Promise.reject("You are not authrized for this service");
                    }
                })),
                (0, express_validator_1.body)("password").trim().notEmpty().isString().isLength({ min: 5, max: 30 }),
            ];
        }
        else if (route == "adminLogin") {
            return [
                (0, express_validator_1.body)("mobile")
                    .trim()
                    .isMobilePhone('any')
                    .notEmpty()
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({
                        where: { mobile: value, status: "ACTIVE", role: user_interface_1.UserRole.ADMIN },
                    });
                    if (!userDoc) {
                        return Promise.reject("You are not authrized for this service");
                    }
                })),
                (0, express_validator_1.body)("password").trim().notEmpty().isString().isLength({ min: 5, max: 30 }),
            ];
        }
        else if (route == "signup") {
            return [
                (0, express_validator_1.body)("mobile")
                    .notEmpty()
                    .trim()
                    .isMobilePhone('any')
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({ where: { mobile: value } });
                    if (userDoc) {
                        return Promise.reject('رقم الهاتف موجود سابقا');
                    }
                })),
            ];
        }
        else if (route == "otp") {
            return [(0, express_validator_1.body)("mobile").trim().notEmpty().isMobilePhone('any'), (0, express_validator_1.body)("otp").trim().notEmpty().isLength({ min: 4, max: 4 })];
        }
        else if (route == "changePassword") {
            return [
                (0, express_validator_1.body)("mobile").trim().notEmpty().isMobilePhone('any').isLength({ min: 9, max: 9 }),
                (0, express_validator_1.body)("password").trim().notEmpty().isString().isLength({ min: 5, max: 30 }),
            ];
        }
        else if (route == "list") {
            return [
                (0, express_validator_1.query)("type").trim().notEmpty().isIn(Object.values(user_interface_1.UserRole)),
            ];
        }
        else if (route == "changeRole") {
            return [
                (0, express_validator_1.body)("userId").trim().notEmpty().isUUID(),
            ];
        }
        else if (route == "getOne") {
            return [
                (0, express_validator_1.param)("userId").trim().notEmpty().isUUID(),
            ];
        }
        else if (route == "createUser") {
            return [
                (0, express_validator_1.body)("name").trim().notEmpty().isLength({ min: 2, max: 80 }),
                (0, express_validator_1.body)("password").trim().notEmpty().isLength({ min: 5, max: 30 }),
                (0, express_validator_1.body)("mobile")
                    .trim()
                    .notEmpty()
                    .isMobilePhone('any')
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({ where: { mobile: value } });
                    if (userDoc) {
                        return Promise.reject('رقم الجوال موجود');
                    }
                })),
            ];
        }
        else if (route == "updateUser") {
            return [
                (0, express_validator_1.body)("name").trim().notEmpty().isLength({ min: 5 }),
                (0, express_validator_1.body)("mobile")
                    .trim()
                    .isMobilePhone('any')
                    .notEmpty()
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({ where: { mobile: value } });
                    if (!userDoc) {
                        return Promise.reject("رقم الجوال غير موجود");
                    }
                })),
                (0, express_validator_1.param)("userId").trim().notEmpty().isUUID(),
            ];
        }
        else if (route == "forgetPassword") {
            return [
                (0, express_validator_1.body)("mobile")
                    .trim()
                    .isMobilePhone('any')
                    .notEmpty()
                    .custom((value) => __awaiter(this, void 0, void 0, function* () {
                    const userDoc = yield db_1.User.findOne({ where: { mobile: value } });
                    if (!userDoc) {
                        return Promise.reject("رقم الجوال غير موجود");
                    }
                })),
            ];
        }
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.router.js.map