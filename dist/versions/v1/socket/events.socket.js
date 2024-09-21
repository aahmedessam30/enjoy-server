"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (socket, io) => {
    const userId = socket.userId;
    userId && socket.join(`${userId}`);
    socket.on("offer:new", (body) => {
        if (userId && body.requestId)
            socket.join(`${userId}_${body.requestId}`);
    });
    socket.on("chat:room", (body) => {
        if (userId && body.chatId)
            socket.join(`${body.chatId}`);
    });
};
//# sourceMappingURL=events.socket.js.map