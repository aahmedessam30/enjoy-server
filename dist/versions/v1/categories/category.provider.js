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
const db_1 = require("../../../db");
const services_1 = require("../../../services/services");
const index_provider_1 = __importDefault(require("../index.provider"));
class CategoryProvider extends index_provider_1.default {
    constructor() {
        super("category");
    }
    getCategory({ categoryId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield db_1.Category.findByPk(categoryId, { attributes: { include: [this.concatImg("icon")] } });
                if (!category) {
                    (0, services_1.GenerateError)({ message: this._i18n("categoryNotFound"), code: 404 });
                }
                return {
                    category,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Category.findAndCountAll({
                where: { status: "ACTIVE" },
                attributes: ["id", "nameAr", "nameEn",],
            });
            let result;
            if (count > 0) {
                result = { message: "Fetched successfully", payload: { categories: rows, }, status: "success", };
            }
            else {
                result = { message: this._i18n("thereNoCategories"), payload: { categories: [] }, status: "success", };
            }
            return { result };
        });
    }
    getCategoriesWithFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Category.findAndCountAll({
                where: { status: "ACTIVE" },
                attributes: ["id", "nameAr", "nameEn"],
                include: [
                    {
                        model: db_1.Feature,
                        attributes: ["id", "nameAr", "nameEn"],
                        through: { attributes: [] },
                    },
                ],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { categories: rows },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNoCategories"),
                    payload: { categories: [] },
                    status: "success",
                };
            }
            return { result };
        });
    }
    getDashboardCategories({ page, perPage }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Category.findAndCountAll({
                where: { status: "ACTIVE" },
                offset: page * perPage,
                limit: perPage,
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "Fetched successfully",
                    payload: { categories: rows, totalItems: count },
                    status: "success",
                };
            }
            else {
                result = {
                    message: this._i18n("thereNoCategories"),
                    payload: { categories: [] },
                    status: "success",
                };
            }
            return { result };
        });
    }
    createCategory({ category }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Category.create({
                nameAr: category.nameAr,
                nameEn: category.nameEn,
                countryId: category.countryId,
            });
            return { category: result };
        });
    }
    updateCategory({ categoryId, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield db_1.Category.findByPk(categoryId);
            if (!category) {
                (0, services_1.GenerateError)({ message: this._i18n("categoryNotFound"), code: 404 });
            }
            category.nameAr = data.nameAr;
            category.nameEn = data.nameEn;
            const result = yield category.save();
            return { category: result };
        });
    }
    updateCategoryStatus({ categoryId, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield db_1.Category.findByPk(categoryId);
                if (!category) {
                    (0, services_1.GenerateError)({ message: this._i18n("categoryNotFound"), code: 404 });
                }
                let result = category;
                if (category.status !== status) {
                    category.status = status;
                    result = yield category.save();
                }
                return { category: result };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CategoryProvider;
//# sourceMappingURL=category.provider.js.map