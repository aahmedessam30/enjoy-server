"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const firebaseCredential = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../../assets/darkkom-adminsdk.json"), "utf-8"));
const adminSdk = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseCredential),
});
class NotifyService {
    sendNotify({ title, message, tokens, deeplink = "darkkom://notify", image = "" }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield adminSdk.messaging().sendToDevice(tokens, {
                    notification: {
                        title: title,
                        body: message,
                        image,
                    },
                    data: {},
                }, {
                    contentAvailable: true,
                    priority: "high",
                });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    subscribeToTopicAll(tokens) {
        adminSdk.messaging().subscribeToTopic(tokens, "all");
    }
    unsubscribeFromTopicAll(tokens) {
        adminSdk.messaging().unsubscribeFromTopic(tokens, "all");
    }
    sendNotifyAll({ title, message, deeplink = `darkkom://notify`, image = "" }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = {
                    notification: {
                        title: title,
                        body: message,
                    },
                    data: {},
                    android: {
                        priority: "high",
                        notification: {},
                    },
                    apns: {
                        payload: {
                            aps: {
                                "mutable-content": 1,
                            },
                        },
                        fcmOptions: {},
                    },
                    webpush: {
                        headers: {},
                    },
                    topic: "all",
                };
                if (image != "") {
                    notification.android.notification.imageUrl = image;
                    notification.apns.fcmOptions.imageUrl = image;
                    notification.webpush.headers.image = image;
                }
                const options = {
                    priority: "high",
                    timeToLive: 0 * 0 * 0,
                };
                const send = yield adminSdk.messaging().send(notification);
                console.log(send);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = NotifyService;
//# sourceMappingURL=notify.js.map