import admin from "firebase-admin"
import { TopicMessage } from "firebase-admin/lib/messaging/messaging-api"
import fs from "fs"
import path from "path"

const firebaseCredential = JSON.parse(fs.readFileSync(path.join(__dirname, "../../assets/darkkom-adminsdk.json"), "utf-8"))

const adminSdk = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
})

export default class NotifyService {
  async sendNotify({ title, message, tokens, deeplink = "darkkom://notify", image = "" }) {
    try {
      await adminSdk.messaging().sendToDevice(
        tokens,
        {
          notification: {
            title: title,
            body: message,
            image,
          },
          data: {
            // deeplink: deeplink,
          },
        },
        {
          contentAvailable: true,
          priority: "high",
        },
      )
    } catch (e) {
      console.log(e)
    }
  }

  subscribeToTopicAll(tokens: string | string[]) {
    adminSdk.messaging().subscribeToTopic(tokens, "all")
    // .then((d) => console.log(d))
    // .catch((e) => console.log(e))
  }

  unsubscribeFromTopicAll(tokens: string | string[]) {
    adminSdk.messaging().unsubscribeFromTopic(tokens, "all")
  }

  async sendNotifyAll({ title, message, deeplink = `darkkom://notify`, image = "" }) {
    try {
      const notification: TopicMessage = {
        notification: {
          title: title,
          body: message,
        },
        data: {
          // deeplink: deeplink,
        },
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
      }
      if (image != "") {
        notification.android.notification.imageUrl = image
        notification.apns.fcmOptions.imageUrl = image
        notification.webpush.headers.image = image
      }
      const options = {
        priority: "high",
        timeToLive: 0 * 0 * 0,
      }
      const send = await adminSdk.messaging().send(notification)
      console.log(send)
    } catch (e) {
      console.log(e)
    }
  }
}
