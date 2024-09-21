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
const contact_provider_1 = __importDefault(require("./contact.provider"));
const Contact = new contact_provider_1.default();
class ContactController {
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPage = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 30;
                const { result } = yield Contact.list({ currentPage, perPage });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    create(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { contact } = yield Contact.create({
                    name: req.body.name,
                    message: (_a = req.body) === null || _a === void 0 ? void 0 : _a.message,
                    mobile: (_b = req.body) === null || _b === void 0 ? void 0 : _b.mobile,
                    email: req.body.email,
                });
                res.status(200).json({
                    payload: { contact },
                    message: "contact created",
                    status: "success"
                });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactId = req.query.contactId;
                yield Contact.remove({ uuid: contactId });
                res.status(200).json({ message: "contact removed", status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = ContactController;
//# sourceMappingURL=contact.controller.js.map