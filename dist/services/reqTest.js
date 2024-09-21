"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.reqTest = void 0;
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
exports.reqTest = (0, supertest_1.default)(new app_1.App().app);
const api = (dir) => {
    return "/api/" + path_1.default.basename(path_1.default.dirname(dir));
};
exports.api = api;
//# sourceMappingURL=reqTest.js.map