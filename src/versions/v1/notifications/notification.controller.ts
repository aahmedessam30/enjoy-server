import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import NotificationProvider from "./notification.provider"

const Notification = new NotificationProvider()

export default class NotificationController {
  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 30
      const { result } = await Notification.getNotifications({ userId: req.userId, currentPage, perPage })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async makeRead(req: Request, res: Response, next: NextFunction) {
    try {
      await Notification.makeRead({ userId: req.userId })
      res.status(200).json({ message: "Notification readed", status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
  async unreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await Notification.unreadCount({ userId: req.userId })
      res.status(200).json({ message: "Fetched success", payload: { count }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
  async removeNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notificationId = req.query.notificationId
      await Notification.deleteNotification({ notificationId })
      res.status(200).json({ message: "Notification removed", status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
}
