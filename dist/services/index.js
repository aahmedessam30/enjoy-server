"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUniqueId = void 0;
const logger_1 = __importDefault(require("./logger"));
exports.default = { logger: logger_1.default };
var generateId_1 = require("./generateId");
Object.defineProperty(exports, "genUniqueId", { enumerable: true, get: function () { return __importDefault(generateId_1).default; } });
//# sourceMappingURL=index.js.map