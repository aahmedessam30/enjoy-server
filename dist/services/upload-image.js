"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const uuid_1 = __importDefault(require("uuid"));
const config_1 = require("../config");
function UploadImage() {
    this.spacesEndpoint = new aws_sdk_1.default.Endpoint("fra1.digitaloceanspaces.com/uploads/images");
    this.s3 = new aws_sdk_1.default.S3(Object.assign({ endpoint: this.spacesEndpoint }, config_1.s3Config));
    this.uploadImage = (0, multer_1.default)({
        storage: (0, multer_s3_1.default)({
            s3: this.s3,
            bucket: "darkkom",
            acl: "public-read",
            contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname, contentType: "image/jpeg" });
            },
            key: function (request, file, cb) {
                cb(null, uuid_1.default.v4() + "-" + new Date().toLocaleDateString() + ".png");
            },
        }),
    }).array("avatar", 1);
    this.uploadImages = (0, multer_1.default)({
        storage: (0, multer_s3_1.default)({
            s3: this.s3,
            bucket: "darkkom",
            acl: "public-read",
            contentType: function (req, file, cb) {
                cb(null, "image/jpg");
            },
            key: function (request, file, cb) {
                cb(null, uuid_1.default.v4() + "-" + new Date().toLocaleDateString() + ".png");
            },
        }),
    }).array("images", 30);
}
exports.default = UploadImage;
//# sourceMappingURL=upload-image.js.map