"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const httpTransportOptions = {
    host: "http-intake.logs.datadoghq.com",
    path: "/api/v2/logs?dd-api-key=9d7873bd4ccc253de1a76dd499d0e3a189cbecba&ddsource=nodejs&service=enjoy",
    ssl: true,
};
const logger = (0, winston_1.createLogger)({
    level: "info",
    exitOnError: false,
    format: winston_1.format.json(),
    transports: [new winston_1.transports.Http(httpTransportOptions)],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map