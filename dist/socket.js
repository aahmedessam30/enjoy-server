"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketVersions = void 0;
const admin_ui_1 = require("@socket.io/admin-ui");
const socket_1 = require("./versions/v1/socket");
class Socket {
    constructor() {
        new socket_1.Socket();
        this.admin();
    }
    admin() {
        (0, admin_ui_1.instrument)(globalIo, {
            auth: {
                type: "basic",
                username: "admin",
                password: "$2b$10$6PsM/c599sw2W5wXx4ewkuQ.eDu/3ryqejfgSLVUc06gOF51/YJnq",
            },
        });
    }
}
exports.socketVersions = ["v4"];
exports.default = Socket;
//# sourceMappingURL=socket.js.map