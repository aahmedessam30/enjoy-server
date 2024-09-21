//Business logic for all Notification routes
import { GenerateError } from "../../../services/services"
import { Notification, User } from "../../../db"
import { Op } from "sequelize"
import DeviceProvider from "../devices/device.provider"
import NotifyService from "../../../services/notify"
import { Socket } from "../socket"
import { NotificationStatus, NotificationType } from "../../../interfaces/notification.interface"
import sequelize from "../../../models"

export default class NotificationProvider {
  async createNotificationToUsers(users: string[], title: string, body: string, type: NotificationType, data?: string) {
    const notification = await Notification.create({
      title: title,
      body: body,
      type: type,
      data: data,
    })
    await notification.addUsers(users)

    return { notification }
  }

  async getNotifications({ userId, currentPage, perPage }) {
    const { count, rows } = await Notification.findAndCountAll({
      distinct: true,
      include: [
        {
          model: User,
          attributes: ["id"],
          where: { id: userId, status: { [Op.ne]: "DELETED" } },
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: perPage,
      offset: currentPage * perPage,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: {
          notifications: rows,
          totalItems: count,
          currentPage,
          limit: perPage,
        },
        status: "success",
      }
    } else {
      result = {
        message: "There are not notifications yet.!",
        payload: { notifications: [], totalItems: count, currentPage, limit: perPage },
        status: "success",
      }
    }
    return { result }
  }

  async makeRead({ userId }) {
    await Notification.update(
      { readAt: new Date(), status: NotificationStatus.READ },
      {
        where: {
          status: NotificationStatus.UNREAD,
          id: { [Op.in]: sequelize.literal(`(SELECT notificationId FROM user_notifications WHERE userId=${userId})`) },
        },
      },
    )
  }
  async unreadCount({ userId }) {
    const count = await Notification.count({
      where: {
        status: NotificationStatus.UNREAD,
        id: { [Op.in]: sequelize.literal(`(SELECT notificationId FROM user_notifications WHERE userId=${userId})`) },
      },
    })
    return count
  }
  async deleteNotification({ notificationId }) {
    const notify = await Notification.findByPk(notificationId)
    if (!notify) {
      GenerateError({ message: "Notification is not found.", code: 404 })
    }
    notify.status = NotificationStatus.DELETED
    await notify.save()
  }
  /**
   * Send notification to Users
   * @param {*} users array of users ids
   * @param {*} body message of notify
   * @param {*} type type of notify
   * @param {*} deeplink for open in specific screen
   * @param {*} data data to store in DB <string>
   */
  async sendNotifyToUsers(
    users: string[],
    body: string,
    type: NotificationType,
    deeplink: string = "darkkom://notify",
    data?: string,
    title: string = "تطبيق عقاريتو",
  ) {
    const { notification } = await new NotificationProvider().createNotificationToUsers(users, title, body, type, data)
    new Socket().send("notify:receive", users.map(String), notification)
    const { tokens } = await new DeviceProvider().getUsersDevices({ users: users })
    if (notification && tokens.length > 0) {
      await new NotifyService().sendNotify({
        title: title,
        message: body,
        tokens,
        deeplink: deeplink,
      })
    }
  }
}
