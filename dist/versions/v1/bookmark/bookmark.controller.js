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
const bookmark_provider_1 = __importDefault(require("./bookmark.provider"));
const filter_bookmark_list_dto_1 = require("./dtos/filter-bookmark-list.dto");
const Bookmark = new bookmark_provider_1.default();
class BookmarkController {
    list(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterBookmarkListDto = new filter_bookmark_list_dto_1.FilterBookmarkListDto();
                filterBookmarkListDto.userId = req === null || req === void 0 ? void 0 : req.userId;
                filterBookmarkListDto.currentPage = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
                filterBookmarkListDto.perPage = Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.perPage) || 15;
                const { bookmarks, total } = yield Bookmark.list(filterBookmarkListDto);
                res.status(200).json({
                    message: "list bookmarks success",
                    payload: {
                        bookmarks,
                        currentPage: filterBookmarkListDto.currentPage,
                        total,
                        limit: filterBookmarkListDto.perPage
                    },
                    status: "success"
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBookmarkDto = req.body;
                createBookmarkDto.userId = req === null || req === void 0 ? void 0 : req.userId;
                const { bookmark } = yield Bookmark.add(createBookmarkDto);
                res.status(201).json({ message: "bookmark added success", payload: { bookmark }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookmarkId } = req.params;
                yield Bookmark.remove({ bookmarkId });
                res.status(200).json({
                    message: "bookmark removed successfully",
                    payload: { bookmarkId },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = BookmarkController;
//# sourceMappingURL=bookmark.controller.js.map