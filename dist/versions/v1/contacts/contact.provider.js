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
const services_1 = require("../../../services/services");
const db_1 = require("../../../db");
class ContactProvider {
    create(createDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield db_1.Contact.create(createDto);
            return { contact };
        });
    }
    list({ currentPage, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Contact.findAndCountAll({
                order: [["createdAt", "DESC"]],
                limit: perPage,
                offset: currentPage * perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    payload: {
                        contacts: rows,
                        totalItems: count,
                        currentPage,
                        limit: perPage,
                    },
                    status: "success",
                };
            }
            else {
                result = {
                    payload: { contacts: [], totalItems: count, currentPage, limit: perPage },
                    status: "success",
                };
            }
            return { result };
        });
    }
    remove({ uuid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield db_1.Contact.findByPk(uuid);
            if (!contact) {
                (0, services_1.GenerateError)({ message: "contact is not found.", code: 404 });
            }
            yield contact.destroy();
        });
    }
}
exports.default = ContactProvider;
//# sourceMappingURL=contact.provider.js.map