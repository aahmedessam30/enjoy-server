import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import NotifyService from "../../../services/notify"
import NotificationProvider from "../notifications/notification.provider"
import { NotificationType } from "../../../interfaces/notification.interface"

const notifyService = new NotifyService()
const notificationProvider = new NotificationProvider()

export default class NotifyController {
  async sendNotifyToAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { message, title } = req.body
      await notifyService.sendNotifyAll({ title, message })
      res.status(200).json({ status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
  async sendNotifyToUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const { message } = req.body

      await notificationProvider.sendNotifyToUsers([userId], message, NotificationType.NEW_MESSAGE)
      res.status(200).json({ status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
}
