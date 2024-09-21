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
const { CatchError } = require("../../../services/services");
class MediaController {
    createImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let image = null;
                const folder = req.body.folder || "images";
                if (req.files && req.files.length) {
                    image = {
                        key: `${folder}/${req.files[0].key}`,
                        url: `https://darkkom.fra1.digitaloceanspaces.com/uploads/${folder}/${req.files[0].key}`,
                    };
                }
                res.status(201).json({
                    message: "image created",
                    payload: { image },
                    status: "success",
                });
            }
            catch (err) {
                CatchError(err, next);
            }
        });
    }
    createImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                const folder = req.body.folder || "properties";
                const images = [];
                if (req.files && req.files.length > 0) {
                    for (let file of files) {
                        images.push({
                            key: `${folder}/${file.key}`,
                            url: `https://darkkom.fra1.digitaloceanspaces.com/uploads/${folder}/${file.key}`,
                        });
                    }
                }
                res.status(201).json({
                    message: "images created",
                    payload: { images },
                    status: "success",
                });
            }
            catch (err) {
                CatchError(err, next);
            }
        });
    }
    createFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let file = null;
                const folder = req.body.folder || "images";
                if (req.files && req.files.length) {
                    file = {
                        key: `${folder}/${req.files[0].key}`,
                        url: `https://darkkom.fra1.digitaloceanspaces.com/uploads/${folder}/${req.files[0].location}`,
                    };
                }
                res.status(201).json({
                    message: "file created",
                    payload: { file },
                    status: "success",
                });
            }
            catch (err) {
                CatchError(err, next);
            }
        });
    }
}
exports.default = MediaController;
//# sourceMappingURL=media.controller.js.map