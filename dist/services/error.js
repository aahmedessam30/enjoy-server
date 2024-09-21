"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketError = exports.CatchError = exports.GenerateError = void 0;
function GenerateError({ message, code, errors = [] }) {
    const error = new Error(message);
    error.statusCode = code;
    if (errors) {
        error.errors = errors;
    }
    throw error;
}
exports.GenerateError = GenerateError;
function CatchError(err, next) {
    if (!(err === null || err === void 0 ? void 0 : err.statusCode)) {
        err.statusCode = 500;
    }
    next(err);
}
exports.CatchError = CatchError;
function SocketError({ message, code, errors = [] }) {
    const error = new Error();
    error.statusCode = code;
    error.message = message;
    error.errors = errors;
    throw error;
}
exports.SocketError = SocketError;
//# sourceMappingURL=error.js.map