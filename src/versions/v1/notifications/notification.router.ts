import { Router } from "express"
import NotificationController from "./notification.controller"
import { isAuth } from "../../../middlewares/auth.old"

export default class NotificationRouter {
  router: Router
  private notificationController = new NotificationController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/", isAuth, this.notificationController.getNotifications)
    // make notifications as read
    this.router.post("/read", isAuth, this.notificationController.makeRead)
    // Unread count
    this.router.get("/unread-count", isAuth, this.notificationController.unreadCount)

    this.router.delete("/", isAuth, this.notificationController.removeNotification)
  }
  private validator(route: string) {}
}
