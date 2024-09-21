"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.NotificationStatus = void 0;
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["UNREAD"] = "UNREAD";
    NotificationStatus["READ"] = "READ";
    NotificationStatus["DELETED"] = "DELETED";
})(NotificationStatus = exports.NotificationStatus || (exports.NotificationStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["GENERAL"] = "GENERAL";
    NotificationType["NEW_MESSAGE"] = "NEW_MESSAGE";
    NotificationType["SUBSCRIPTION"] = "SUBSCRIPTION";
    NotificationType["NEW_OFFER"] = "NEW_OFFER";
    NotificationType["PROPERTY"] = "PROPERTY";
    NotificationType["QUESTION"] = "QUESTION";
    NotificationType["PROMO_CODE"] = "PROMO_CODE";
    NotificationType["USER"] = "USER";
    NotificationType["PROJECT"] = "PROJECT";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
//# sourceMappingURL=notification.interface.js.map