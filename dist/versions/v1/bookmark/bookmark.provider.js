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
const index_provider_1 = __importDefault(require("../index.provider"));
class BookmarkProvider extends index_provider_1.default {
    constructor() {
        super("bookmark");
    }
    list(filterBookmarkListDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield db_1.Bookmark.findAndCountAll({
                attributes: ['id', 'createdAt'],
                distinct: true,
                where: { userId: filterBookmarkListDto.userId },
                include: [
                    {
                        model: db_1.Unit,
                        attributes: { 'exclude': ['userId', 'categoryId', 'status'] },
                        include: [
                            { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                            {
                                model: db_1.UnitLocation,
                                attributes: ["id", "cityId", "districtId"],
                                required: true,
                                include: [
                                    { model: db_1.City, attributes: ["id", "nameAr", "nameEn"] },
                                    { model: db_1.District, attributes: ["id", "nameAr", "nameEn"] },
                                ],
                            },
                        ],
                    }
                ],
                order: [["createdAt", "DESC"]],
                limit: filterBookmarkListDto.perPage,
                offset: (filterBookmarkListDto.currentPage - 1) * filterBookmarkListDto.perPage,
            });
            return { bookmarks: rows, total: count };
        });
    }
    add(createBookmarkDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Unit.findByPk(createBookmarkDto.unitId);
            if (!result) {
                (0, services_1.GenerateError)({ message: this._i18n("notFound"), code: 404 });
            }
            const isAddBefore = yield db_1.Bookmark.count({
                where: { userId: createBookmarkDto.userId, unitId: createBookmarkDto.unitId },
            });
            if (isAddBefore != 0) {
                (0, services_1.GenerateError)({ message: this._i18n("bookmarkAddDefore"), code: 400 });
            }
            const bookmarkInserted = yield db_1.Bookmark.create(createBookmarkDto);
            const bookmark = yield db_1.Bookmark.findOne({
                attributes: ['id', 'createdAt'],
                where: { id: bookmarkInserted.id },
                include: [
                    {
                        model: db_1.Unit,
                        attributes: { 'exclude': ['userId', 'categoryId', 'status'] },
                        include: [
                            { model: db_1.Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
                            {
                                model: db_1.UnitLocation,
                                attributes: ["id", "lat", "lng", "address1"],
                                required: true,
                            },
                        ],
                    }
                ],
            });
            return { bookmark };
        });
    }
    remove({ bookmarkId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookmark = yield db_1.Bookmark.findByPk(bookmarkId);
            if (!bookmark) {
                (0, services_1.GenerateError)({ message: this._i18n("bookmarkNotFound"), code: 404 });
            }
            yield db_1.Bookmark.destroy({ where: { id: bookmarkId } });
        });
    }
}
exports.default = BookmarkProvider;
//# sourceMappingURL=bookmark.provider.js.map