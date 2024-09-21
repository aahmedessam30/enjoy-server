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
const image_provider_1 = __importDefault(require("./image.provider"));
const Image = new image_provider_1.default();
class ImageController {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { module, moduleId, images } = req.body;
                const { result } = yield Image.add({ module, moduleId, images });
                res.status(201).json({ message: "images added successfully", payload: { images: result }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    addSingle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createImageDto = req.body;
                const { image } = yield Image.addSingle(createImageDto);
                res.status(201).json({ message: "image added success", payload: { image }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { imageId } = req.params;
                yield Image.remove({ imageId });
                res.status(200).json({
                    message: "image removed successfully",
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = ImageController;
//# sourceMappingURL=image.controller.js.map