"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_service_1 = __importDefault(require("./media.service"));
const multer_1 = __importDefault(require("multer"));
const UnitsMedia = new media_service_1.default({ url: "fra1.digitaloceanspaces.com/uploads/enjoy" });
class MediaRouter {
    constructor() {
        this.storage = multer_1.default.memoryStorage();
        this.upload = (0, multer_1.default)({ storage: this.storage });
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/image/units", this.upload.array("image", 1), UnitsMedia.ImageWatermark);
        this.router.post("/upload-image", this.upload.array("image", 1), UnitsMedia.smallImage);
        this.router.post("/images/units", this.upload.array("image", 10), UnitsMedia.ImagesWatermark);
    }
    validator(route) { }
}
exports.default = MediaRouter;
//# sourceMappingURL=media.router.js.map