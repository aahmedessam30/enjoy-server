"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const config_1 = require("./config");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const i18n_middleware_1 = require("./middlewares/i18n.middleware");
const rootRouter_1 = __importDefault(require("./rootRouter"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const socket_1 = __importDefault(require("./socket"));
class App {
    constructor() {
        this.port = config_1.appConfig.port;
        this.initialize();
        this.handleRoutes();
        this.handleSocketConnection();
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer, { cors: { origin: "*" } });
    }
    handleRoutes() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(i18n_middleware_1.i18nApply);
        (0, rootRouter_1.default)(this.app);
        this.app.use((error, req, res, next) => {
            const status = error.statusCode || 500;
            const message = error.message;
            const errors = error.errors || [];
            res.status(status).json({ message: message, errors: errors });
        });
    }
    handleSocketConnection() {
        global.globalIo = this.io;
        new socket_1.default();
    }
    listen(callback) {
        this.httpServer.listen(this.port, () => callback(this.port));
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map