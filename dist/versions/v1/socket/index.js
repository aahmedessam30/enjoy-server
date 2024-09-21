"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../../../config");
const socket_1 = require("../../../socket");
const events_socket_1 = __importDefault(require("./events.socket"));
class Socket {
    constructor() {
        this.io = globalIo;
        this.version = `/${path_1.default.basename(path_1.default.dirname(__dirname))}`;
        this.connection();
    }
    connection() {
        const connection = this.io.of(`${this.version}`).setMaxListeners(0);
        connection.use(this.socketAuth).on("connection", (socket) => (0, events_socket_1.default)(socket.setMaxListeners(0), connection));
    }
    socketAuth(socket, next) {
        try {
            const Authorization = socket.handshake.query.Authorization;
            if (!Authorization)
                next();
            const decoded = jsonwebtoken_1.default.verify(Authorization, config_1.jwtConfig.SECRETKEY);
            socket.userId = decoded.userId;
            next();
        }
        catch (e) {
            next();
        }
    }
    send(event, room, data) {
        socket_1.socketVersions.forEach((v) => this.io.of(`/${v}`).to(room).emit(event, data));
    }
}
exports.Socket = Socket;
//# sourceMappingURL=index.js.map