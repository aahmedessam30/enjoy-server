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
const notification_interface_1 = require("../../../../interfaces/notification.interface");
const services_1 = require("../../../../services/services");
const notification_provider_1 = __importDefault(require("../../notifications/notification.provider"));
const unit_provider_1 = __importDefault(require("../unit.provider"));
const property_dash_provider_1 = __importDefault(require("./property-dash.provider"));
const PropDash = new property_dash_provider_1.default();
class PropDashcontroller {
    createProperty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { property } = yield new unit_provider_1.default().createUnit({ userId: req.body.userId, createPropertyDto: req.body });
                res.status(201).json({
                    message: "property created.",
                    payload: { unitId: property },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getDashboardProperties(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { currentPage, perPage } = req.query;
                const { result } = yield PropDash.getDashboardProperties(Number(currentPage), Number(perPage));
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    getPropertiesStats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield PropDash.getPropertiesStats({ userId: req.query.userId });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    changeStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyId = req.params.propertyId;
                const type = req.body.type;
                const { property } = yield PropDash.changeStatus({ propertyId, type });
                const msg = type == "ACTIVE"
                    ? `تم تنشيط الاعلان رقم #${propertyId}`
                    : type == "ARCHIVE"
                        ? `تم نقل الاعلان رقم #${propertyId} الي الارشيف`
                        : type == "ARCHIVE"
                            ? `تتم مراجعه الاعلان رقم #${propertyId}`
                            : `تم تغير حاله الاعلان رقم ${propertyId} ل ${type}`;
                new notification_provider_1.default().sendNotifyToUsers([property.userId], msg, notification_interface_1.NotificationType.PROPERTY, `darkkom://properties?propertyId=${propertyId}`, propertyId);
                res.status(200).json({ message: `property ${type}`, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    multiCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield PropDash.multiCount();
                res.status(200).json({ message: "success", payload: result, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = PropDashcontroller;
//# sourceMappingURL=property-dash.controller.js.map