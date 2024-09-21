"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./versions/v1/router");
function router(app) {
    app.use("/api/v1", new router_1.MainRouter().router);
}
exports.default = router;
//# sourceMappingURL=rootRouter.js.map