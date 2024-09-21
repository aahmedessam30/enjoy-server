import { IUser } from "./user.interface"

export interface INotification {
  readonly id: string
  body: string
  data?: string
  readAt?: Date
  status: NotificationStatus
  title: string
  type: NotificationType
  createdAt?: Date
  updatedAt?: Date

  users?: IUser[]
}

export enum NotificationStatus {
  UNREAD = "UNREAD",
  READ = "READ",
  DELETED = "DELETED",
}
export enum NotificationType {
  GENERAL = "GENERAL",
  NEW_MESSAGE = "NEW_MESSAGE",
  SUBSCRIPTION = "SUBSCRIPTION",
  NEW_OFFER = "NEW_OFFER",
  PROPERTY = "PROPERTY",
  QUESTION = "QUESTION",
  PROMO_CODE = "PROMO_CODE",
  USER = "USER",
  PROJECT = "PROJECT",
}
