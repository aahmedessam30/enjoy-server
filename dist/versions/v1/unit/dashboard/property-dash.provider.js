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
const services_1 = require("../../../../services/services");
const db_1 = require("../../../../db");
const index_provider_1 = __importDefault(require("../../index.provider"));
class PropDashProvider extends index_provider_1.default {
    constructor() {
        super("unit");
    }
    getPropertiesStats({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propertiesNo = yield db_1.Unit.count({ where: { userId: userId } });
                const activeProperties = yield db_1.Unit.count({ where: { userId: userId, status: "ACTIVE" } });
                const propertiesUnderReview = yield db_1.Unit.count({ where: { userId: userId, status: "UNDER_REVIEW" } });
                const archiveProperties = yield db_1.Unit.count({ where: { userId: userId, status: "ARCHIVE" } });
                return { result: { propertiesNo, activeProperties, archiveProperties, propertiesUnderReview } };
            }
            catch (error) {
                (0, services_1.GenerateError)({ message: "error", code: 404 });
            }
        });
    }
    getDashboardProperties(currentPage = 0, perPage = 16) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Unit.findAndCountAll({
                attributes: { include: [this.concatImg("image")] },
                distinct: true,
                include: [
                    { model: db_1.Category, attributes: ["id", "nameEn"] },
                    {
                        model: db_1.UnitLocation,
                        attributes: ["id", "lat", "lng", "address1"],
                        include: [
                            { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                            { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
                limit: perPage,
                offset: currentPage * perPage,
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: {
                        properties: rows,
                        totalItems: count,
                    },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not Properties yet.!",
                    payload: { properties: [], totalItems: count },
                    status: "success",
                };
            }
            return { result };
        });
    }
    changeStatus({ propertyId, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield db_1.Unit.findByPk(propertyId);
            if (!property) {
                (0, services_1.GenerateError)({ message: this._i18n("propertyNotFound"), code: 404 });
            }
            property.status = type;
            yield property.save();
            return { property };
        });
    }
}
exports.default = PropDashProvider;
//# sourceMappingURL=property-dash.provider.js.map