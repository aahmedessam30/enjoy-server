"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nTranslator = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function i18nTranslator(text, lang = "ar") {
    try {
        return jsonRead(text.substring(2).split("|"), lang);
    }
    catch (error) {
        return "error happened ...";
    }
}
exports.i18nTranslator = i18nTranslator;
function jsonRead(module_key, lang) {
    const jsonPath = path_1.default.join(__dirname, `../../assets/i18n/${module_key[0]}/${lang}.json`);
    const dataFile = JSON.parse(fs_1.default.readFileSync(jsonPath, "utf8").trim());
    return dataFile[module_key[1]] ? dataFile[module_key[1]] : "error happened";
}
//# sourceMappingURL=i18n.service.js.map