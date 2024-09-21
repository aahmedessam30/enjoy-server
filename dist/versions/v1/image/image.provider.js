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
const services_1 = require("../../../services/services");
const db = __importStar(require("../../../db"));
const index_provider_1 = __importDefault(require("../index.provider"));
class ImageProvider extends index_provider_1.default {
    constructor() {
        super("image");
    }
    add({ module, moduleId, images }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db[module].findByPk(moduleId, { include: db.Image });
            if (!result) {
                (0, services_1.GenerateError)({ message: this._i18n("notFound"), code: 404 });
            }
            const imageIds = yield db.Image.bulkCreate(images);
            yield result.addImage(imageIds, { through: { selfGranted: false } });
            return { result: imageIds };
        });
    }
    addSingle(createImageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield db.Image.create(createImageDto);
            return { image };
        });
    }
    remove({ imageId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield db.Image.findByPk(imageId);
            if (!image) {
                (0, services_1.GenerateError)({ message: this._i18n("imageNotFound"), code: 404 });
            }
            yield db.Image.destroy({ where: { id: imageId } });
        });
    }
}
exports.default = ImageProvider;
//# sourceMappingURL=image.provider.js.map