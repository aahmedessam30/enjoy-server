"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileSyncHelper = exports.camelTosnakeCase = exports.getEnumKeyByValue = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getEnumKeyByValue(enumName, value) {
    const indexOfS = Object.values(enumName).indexOf(value);
    const key = Object.keys(enumName)[indexOfS];
    return key || "";
}
exports.getEnumKeyByValue = getEnumKeyByValue;
function camelTosnakeCase(text) {
    return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
exports.camelTosnakeCase = camelTosnakeCase;
function readFileSyncHelper(filePath) {
    return fs_1.default.readFileSync(path_1.default.join(__dirname, filePath), "utf8").trim();
}
exports.readFileSyncHelper = readFileSyncHelper;
//# sourceMappingURL=helper.js.map