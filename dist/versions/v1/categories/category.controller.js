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
const category_provider_1 = __importDefault(require("./category.provider"));
const Category = new category_provider_1.default();
class CategoryController {
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = yield Category.getCategory({ categoryId: req.params.categoryId });
                res.status(200).json({ status: "success", payload: { category }, message: "fetched successfully" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Category.getCategories();
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getCategoriesWithFilters(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Category.getCategoriesWithFilters();
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    getDashboardCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 0;
                const perPage = Number(req.query.perPage) || 6;
                const { result } = yield Category.getDashboardCategories({ page, perPage });
                res.status(200).json(result);
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = yield Category.createCategory({ category: req.body });
                res.status(201).json({ message: "category created.", payload: { category }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = yield Category.updateCategory({
                    categoryId: req.params.categoryId,
                    data: req.body,
                });
                res.status(200).json({ message: "category updated.", payload: { category }, status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
    updateCategoryStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Category.updateCategoryStatus({
                    categoryId: req.params.categoryId,
                    status: req.body.status,
                });
                res.status(200).json({ message: "category updated.", status: "success" });
            }
            catch (error) {
                (0, services_1.CatchError)(error, next);
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map