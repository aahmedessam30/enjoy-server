"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function genUniqueId() {
    var _a;
    return (_a = Math.floor(new Date().valueOf() * Math.random())) === null || _a === void 0 ? void 0 : _a.toString();
}
exports.default = genUniqueId;
//# sourceMappingURL=generateId.js.map