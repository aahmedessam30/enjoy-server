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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const services_1 = require("../../../services/services");
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const send_email_1 = __importDefault(require("../../../services/send-email"));
const index_provider_1 = __importDefault(require("../index.provider"));
const notification_provider_1 = __importDefault(require("../notifications/notification.provider"));
const user_interface_1 = require("../../../interfaces/user.interface");
const otp_provider_1 = __importDefault(require("./otps/otp.provider"));
const config_1 = require("../../../config");
class UserProvider extends index_provider_1.default {
    constructor() {
        super("user");
        this.sendEmail = new send_email_1.default();
        this.notify = new notification_provider_1.default();
        this.OTP = new otp_provider_1.default();
    }
    getUser({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findOne({
                where: { id: userId, status: "ACTIVE" },
                attributes: { exclude: ["password"] },
            });
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("accountNotfound"), code: 404 });
            }
            return { user };
        });
    }
    login(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findOne({ where: { mobile: loginDto.mobile } });
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("userNotFound"), code: 404 });
            }
            const isEqual = yield bcryptjs_1.default.compare(loginDto.password, user.password);
            if (!isEqual) {
                (0, services_1.GenerateError)({ message: this._i18n("wrongPassword"), code: 404 });
            }
            const token = jsonwebtoken_1.default.sign({ role: user.role, mobile: user.mobile, userId: user.id }, config_1.jwtConfig.SECRETKEY, {
                expiresIn: "365d",
            });
            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    mobile: user.mobile,
                    code: user.code,
                    role: user.role,
                    email: user.email,
                    createdAt: user.createdAt,
                    authorize: user.authorize,
                },
            };
        });
    }
    getUsers({ type, currentPage, perPage, filter }) {
        return __awaiter(this, void 0, void 0, function* () {
            let filters = {};
            if (typeof filter === "string" && filter !== null && filter !== "") {
                filters = Object.assign(filters, {
                    [sequelize_1.Op.or]: {
                        email: {
                            [sequelize_1.Op.like]: `%${filter}%`,
                        },
                        name: {
                            [sequelize_1.Op.like]: `%${filter}%`,
                        },
                        id: {
                            [sequelize_1.Op.eq]: filter,
                        },
                    },
                });
            }
            const { count, rows } = yield db_1.User.findAndCountAll({
                distinct: true,
                attributes: { exclude: ["password"] },
                where: Object.assign({ role: type }, filters),
                order: [["createdAt", "DESC"]],
                limit: perPage,
                offset: currentPage * perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: this._i18n("fetchedSuccess"),
                    payload: { users: rows, totalItems: count, },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("notFoundUsers"),
                    payload: { users: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPw = yield bcryptjs_1.default.hash(createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.password, 12);
            const userCreated = yield db_1.User.create({
                code: createUserDto.code,
                name: createUserDto.name,
                mobile: createUserDto.mobile,
                role: createUserDto.role,
                password: hashedPw,
            });
            const token = jsonwebtoken_1.default.sign({ mobile: userCreated.mobile, userId: userCreated.id }, config_1.jwtConfig.SECRETKEY, {
                expiresIn: "5000d",
            });
            return {
                token,
                user: {
                    id: userCreated.id,
                    name: userCreated.name,
                    mobile: userCreated.mobile,
                    code: userCreated.code,
                    role: userCreated.role,
                    email: userCreated.email,
                    status: userCreated.status,
                    reference: userCreated.reference,
                    createdAt: userCreated.createdAt,
                    authorize: userCreated.authorize,
                },
            };
        });
    }
    createUserWithoutToken(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPw = yield bcryptjs_1.default.hash(createUserDto === null || createUserDto === void 0 ? void 0 : createUserDto.password, 12);
            const userCreated = yield db_1.User.create({
                code: createUserDto.code,
                name: createUserDto.name,
                mobile: createUserDto.mobile,
                role: createUserDto.role,
                password: hashedPw,
            });
            return {
                user: {
                    id: userCreated.id,
                    name: userCreated.name,
                    mobile: userCreated.mobile,
                    code: userCreated.code,
                    role: userCreated.role,
                    email: userCreated.email,
                    status: userCreated.status,
                    reference: userCreated.reference,
                    createdAt: userCreated.createdAt,
                    authorize: userCreated.authorize,
                },
            };
        });
    }
    changePassword({ password, mobile }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findOne({ where: { mobile: mobile, status: user_interface_1.UserStatus.ACTIVE } });
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("userNotFound"), code: 404 });
            }
            const hashedPw = yield bcryptjs_1.default.hash(password, 12);
            user.password = hashedPw;
            const result = yield (user === null || user === void 0 ? void 0 : user.save());
            const token = jsonwebtoken_1.default.sign({ mobile: result === null || result === void 0 ? void 0 : result.mobile, userId: result === null || result === void 0 ? void 0 : result.id }, config_1.jwtConfig.SECRETKEY, {
                expiresIn: "5000d",
            });
            return {
                token,
                user: {
                    id: result === null || result === void 0 ? void 0 : result.id,
                    name: result === null || result === void 0 ? void 0 : result.name,
                    mobile: result.mobile,
                    code: result.code,
                    role: result.role,
                    email: result.email,
                    status: result.status,
                    reference: result.reference,
                    createdAt: result.createdAt,
                    authorize: result.authorize,
                },
            };
        });
    }
    updateProfile(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findByPk(updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.userId);
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("userNotFound"), code: 404 });
            }
            user.name = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.name;
            user.email = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.email;
            const result = yield user.save();
            return {
                user: {
                    id: result.id,
                    name: result.name,
                    mobile: result.mobile,
                    code: result.code,
                    role: result.role,
                    status: result.status,
                    reference: result.reference,
                    email: result.email,
                    createdAt: result.createdAt,
                    authorize: result.authorize
                },
            };
        });
    }
    updateUser(updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findByPk(updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.userId);
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("userNotFound"), code: 404 });
            }
            user.name = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.name;
            user.email = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.email;
            user.mobile = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.mobile;
            user.authorize = updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.authorize;
            user.status = (updateUserDto === null || updateUserDto === void 0 ? void 0 : updateUserDto.status) ? user_interface_1.UserStatus.ACTIVE : user_interface_1.UserStatus.INACTIVE;
            const result = yield user.save();
            return {
                user: {
                    id: result.id,
                    name: result.name,
                    mobile: result.mobile,
                    code: result.code,
                    role: result.role,
                    status: result.status,
                    reference: result.reference,
                    email: result.email,
                    createdAt: result.createdAt,
                    authorize: result.authorize
                },
            };
        });
    }
    authorizeUser({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findByPk(userId);
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("userNotFound"), code: 404 });
            }
            user.authorize = true;
            const result = yield user.save();
            return { userId: result.id, };
        });
    }
    changeUserRoleToAdmin({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.User.findByPk(userId);
            if (!user) {
                (0, services_1.GenerateError)({ message: this._i18n("userNotFound"), code: 404 });
            }
            if ((user === null || user === void 0 ? void 0 : user.role) !== user_interface_1.UserRole.ADMIN) {
                user.role = user_interface_1.UserRole.ADMIN;
            }
            const result = yield user.save();
            return { userId: result === null || result === void 0 ? void 0 : result.id };
        });
    }
}
exports.default = UserProvider;
//# sourceMappingURL=user.provider.js.map