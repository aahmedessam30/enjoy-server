"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid = __importStar(require("uuid"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const config_1 = require("../../../config");
class Media {
    constructor({ url }) {
        this.s3 = () => {
            return new aws_sdk_1.default.S3({
                endpoint: this.spacesEndpoint,
                credentials: Object.assign({}, config_1.s3Config),
            });
        };
        this.uploadImage = () => {
            return (0, multer_1.default)({
                storage: (0, multer_s3_1.default)({
                    s3: this.s3(),
                    bucket: "enjoy",
                    acl: "public-read",
                    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
                    metadata: function (req, file, cb) {
                        cb(null, { fieldName: file.fieldname, contentType: file.mimetype });
                    },
                    key: function (request, file, cb) {
                        const fileext = /[.]/.exec(file.originalname || "") ? /[^.]+$/.exec(file.originalname || "") : [];
                        const ext = fileext[0] && fileext[0] === "pdf" ? ".pdf" : ".png";
                        cb(null, uuid.v4() + "-" + (0, moment_1.default)(new Date().toISOString()).format("DDMMYYYY") + ext);
                    },
                }),
            }).array("image", 1);
        };
        this.uploadImages = () => {
            return (0, multer_1.default)({
                storage: (0, multer_s3_1.default)({
                    s3: this.s3(),
                    bucket: "enjoy",
                    acl: "public-read",
                    contentType: function (req, file, cb) {
                        cb(null, "image/jpg");
                    },
                    key: function (request, file, cb) {
                        const fileext = /[.]/.exec(file.originalname || "") ? /[^.]+$/.exec(file.originalname || "") : [];
                        const ext = fileext[0] && fileext[0] === "pdf" ? ".pdf" : ".png";
                        cb(null, uuid.v4() + "-" + (0, moment_1.default)(new Date().toISOString()).format("DDMMYYYY") + ext);
                    },
                }),
            }).array("images", 20);
        };
        this.ImageWatermark = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.files[0];
                yield this.uploadImageS3(image)
                    .then((data) => {
                    const folder = req.body.folder || "enjoy";
                    const d = {
                        message: "image created",
                        payload: {
                            image: { key: `${folder}/${data.Key}`, url: data.Location },
                        },
                        status: "success",
                    };
                    res.status(200).json(d);
                })
                    .catch((err) => {
                    res.status(500).json({ msg: "Server Error", error: err });
                });
            }
            catch (err) {
                res.status(500).json({ msg: "Server Error", error: err });
            }
        });
        this.ImagesWatermark = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = [];
                for (let index = 0; index < req.files.length; index++) {
                    const image = req.files[index];
                    yield this.uploadImageS3(image)
                        .then((data) => {
                        const folder = req.body.folder || "enjoy";
                        result.push({ key: `${folder}/${data.Key}`, url: data.Location });
                    })
                        .catch((err) => { });
                }
                res.status(200).json({ message: "images created", payload: { images: result, }, status: "success", });
            }
            catch (err) {
                res.status(500).json({ msg: "Server Error", error: err });
            }
        });
        this.smallImage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.files[0];
                yield this.uploadImageS3(image, false)
                    .then((data) => {
                    const folder = req.body.folder || "enjoy";
                    const d = {
                        message: "image uploaded",
                        payload: {
                            image: { key: `${folder}/${data.Key}`, url: data.Location },
                        },
                        status: "success",
                    };
                    res.status(200).json(d);
                })
                    .catch((err) => {
                    res.status(500).json({ msg: "server error", error: err });
                });
            }
            catch (err) {
                res.status(500).json({ msg: "server error", error: err });
            }
        });
        this.uploadImageS3 = (image, withWatermark = true) => __awaiter(this, void 0, void 0, function* () {
            const file = yield this.resizeImg(image, withWatermark);
            let s3bucket = this.s3();
            const params = {
                Bucket: "enjoy",
                Key: uuid.v4() + "-" + (0, moment_1.default)(new Date().toISOString()).format("DDMMYYYY") + path_1.default.extname(image.originalname),
                Body: file,
                ContentType: image.mimetype,
                ACL: "public-read",
            };
            return s3bucket.upload(params).promise();
        });
        this.resizeImg = (image, withWatermark = true) => __awaiter(this, void 0, void 0, function* () {
            try {
                const metadata = yield (0, sharp_1.default)(image.buffer).resize(1000).metadata();
                const label = Buffer.from(`<svg width="1" height="1"></svg>`);
                const watermark = withWatermark
                    ? yield (0, sharp_1.default)(path_1.default.join(__dirname, "../../../../assets/water_mark.png"))
                        .resize(25)
                        .sharpen()
                        .withMetadata()
                        .toBuffer()
                    : label;
                const file = yield (0, sharp_1.default)(image.buffer)
                    .resize(1000)
                    .composite([
                    {
                        input: watermark,
                        gravity: "southeast",
                    },
                ])[metadata.format == "png" ? "png" : "jpeg"]({ quality: 80 })
                    .sharpen()
                    .withMetadata()
                    .toBuffer();
                return file;
            }
            catch (err) { }
        });
        this.spacesEndpoint = new aws_sdk_1.default.Endpoint(url);
    }
}
exports.default = Media;
//# sourceMappingURL=media.service.js.map