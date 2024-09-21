"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nApply = void 0;
const i18n_service_1 = require("../services/i18n.service");
function i18nApply(req, res, next) {
    const lang = `${req.headers.lang}`;
    if (["en", "ar"].includes(String(lang))) {
        req.lang = lang;
    }
    else {
        req.lang = "ar";
    }
    const oldSend = res.send;
    res.send = function (data) {
        const oldData = JSON.parse(arguments[0]);
        if (oldData.message && typeof oldData.message === "string" && oldData.message.startsWith("$_")) {
            oldData.message = (0, i18n_service_1.i18nTranslator)(oldData.message, req.lang);
            arguments[0] = JSON.stringify(oldData);
            return oldSend.apply(res, arguments);
        }
        else {
            return oldSend.apply(res, arguments);
        }
    };
    next();
}
exports.i18nApply = i18nApply;
//# sourceMappingURL=i18n.middleware.js.map