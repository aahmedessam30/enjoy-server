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
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const main_interface_1 = require("../../../interfaces/main.interface");
const notify_1 = __importDefault(require("../../../services/notify"));
const index_provider_1 = __importDefault(require("../index.provider"));
class DeviceProvider extends index_provider_1.default {
    constructor() {
        super("device");
        this.Notify = new notify_1.default();
    }
    getDevice({ deviceId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield db_1.Device.findByPk(deviceId);
            if (!device) {
                (0, services_1.GenerateError)({ message: this._i18n("deviceNotFound"), code: 404 });
            }
            return { device };
        });
    }
    getDevices({ currentPage = 1, perPage = 30 }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Device.findAndCountAll({
                limit: perPage,
                offset: (currentPage - 1) * perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { devices: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNotDevicesYet"),
                    payload: { devices: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createDevice({ device }) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield db_1.Device.findOne({ where: { token: device.token } });
            this.Notify.subscribeToTopicAll(device.token);
            if (!instance) {
                const result = yield db_1.Device.create({
                    token: device.token,
                    userId: device.userId,
                });
                return { device: result };
            }
            if (instance.status === "INACTIVE") {
                device.status = "ACTIVE";
            }
            instance.token = device.token;
            instance.userId = device.userId;
            const result = yield instance.save();
            return { device: result };
        });
    }
    updateDevice({ userId, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield db_1.Device.findOne({ where: { token: data.token } });
            if (!device) {
                (0, services_1.GenerateError)({ message: this._i18n("deviceNotFound"), code: 404 });
            }
            device.token = data.token;
            device.userId = userId;
            device.status = data.status;
            const result = yield device.save();
            this.Notify.subscribeToTopicAll(data.token);
            return { device: result };
        });
    }
    removeDevice({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield db_1.Device.findOne({ where: { token: token } });
            if (!device) {
                (0, services_1.GenerateError)({ message: this._i18n("deviceNotFound"), code: 404 });
            }
            this.Notify.unsubscribeFromTopicAll(token);
            device.status = main_interface_1.EStatus.DELETED;
            yield device.save();
        });
    }
    getUserDevices({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTokens = yield db_1.Device.findAll({
                where: { userId: { [sequelize_1.Op.eq]: userId }, status: "ACTIVE" },
                attributes: ["token"],
            });
            if (!userTokens) {
                return { tokens: [] };
            }
            return { tokens: userTokens.map((device) => device.token) };
        });
    }
    getUsersDevices({ users }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTokens = yield db_1.Device.findAll({
                where: { userId: users, status: "ACTIVE" },
                attributes: ["token"],
                raw: true,
            });
            if (!userTokens) {
                return { tokens: [] };
            }
            return { tokens: userTokens.map((device) => device.token) };
        });
    }
}
exports.default = DeviceProvider;
//# sourceMappingURL=device.provider.js.map