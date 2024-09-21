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
const services_1 = require("../../../services/services");
const user_provider_1 = __importDefault(require("./user.provider"));
const otp_provider_1 = __importDefault(require("./otps/otp.provider"));
const user_interface_1 = require("../../../interfaces/user.interface");
const User = new user_provider_1.default();
const OTP = new otp_provider_1.default();
class UserController {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = yield User.getUser({ userId: req.userId });
                res.status(200).json({ message: "fetched success", payload: { user }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getUserForAdmin(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = yield User.getUser({ userId: (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId });
                res.status(200).json({ payload: { user }, status: "success" });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = req.query.filter || null;
                const { result } = yield User.getUsers({
                    type: req.query.type,
                    filter,
                    perPage: Number(req.query.perPage) || 16,
                    currentPage: Number(req.query.page) || 0,
                });
                res.status(200).json(result);
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    loginAsGuest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginDto = req.body;
                const { token, user } = yield User.login(loginDto);
                res.status(200).json({
                    message: "logged in success",
                    payload: { token, user },
                    status: "success",
                });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    loginAsAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginDto = req.body;
                const { token, user } = yield User.login(loginDto);
                res.status(200).json({
                    message: "logged in success",
                    payload: { token, user },
                    status: "success",
                });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    loginAsHost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginDto = req.body;
                const { token, user } = yield User.login(loginDto);
                res.status(200).json({
                    message: "logged in success",
                    payload: { token, user },
                    status: "success",
                });
            }
            catch (e) {
                (0, services_1.CatchError)(e, next);
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = yield OTP.saveOTP({ mobile: `${req.body.code}${req.body.mobile}` });
                res.status(200).json({ message: "success", payload: { id: otp }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = yield OTP.verifyOTP({ mobile: req.body.mobile, otp: req.body.otp });
                if (otp) {
                    res.status(200).json({ message: "code is valid", payload: { otp }, status: "success" });
                }
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createGuestUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = req.body;
                createUserDto.role = user_interface_1.UserRole.GUEST;
                const { token, user } = yield User.createUser(createUserDto);
                res.status(201).json({ message: "user created", payload: { user, token }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createHostUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = req.body;
                createUserDto.role = user_interface_1.UserRole.HOST;
                const { token, user } = yield User.createUser(createUserDto);
                res.status(201).json({ message: "user created", payload: { user, token }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createHostWithoutToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = req.body;
                createUserDto.role = user_interface_1.UserRole.HOST;
                const { user } = yield User.createUserWithoutToken(createUserDto);
                res.status(201).json({ message: "host created", payload: { user }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createGuestWithoutToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = req.body;
                createUserDto.role = user_interface_1.UserRole.GUEST;
                const { user } = yield User.createUserWithoutToken(createUserDto);
                res.status(201).json({ message: "guest created", payload: { user }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    changePassword(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, user } = yield User.changePassword({ password: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password, mobile: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.mobile });
                res.status(200).json({ message: "password changed", payload: { user, token }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUserDto = req.body;
                updateUserDto.userId = req === null || req === void 0 ? void 0 : req.userId;
                const { user } = yield User.updateProfile(updateUserDto);
                res.status(200).json({ message: "user updated.", payload: { user }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    updateUser(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateUserDto = req.body;
                updateUserDto.userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
                const { user } = yield User.updateUser(updateUserDto);
                res.status(200).json({ message: "user updated.", payload: { user }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    changeUserRoleToAdmin(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ;
                const { userId } = yield User.changeUserRoleToAdmin({ userId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.userId });
                res.status(200).json({ message: "role changed.", payload: { userId }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield OTP.forgetPassword({ mobile: req.body.mobile });
                res.status(200).json({
                    message: "otp send to your mobile.",
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map