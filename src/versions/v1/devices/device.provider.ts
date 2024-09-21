//Business logic for all Devices routes
import { GenerateError } from "../../../services/services"
import { Device } from "../../../db"
import { Op } from "sequelize"
import { EStatus } from "../../../interfaces/main.interface"
import NotifyService from "../../../services/notify"
import MainProvider from "../index.provider"

export default class DeviceProvider extends MainProvider {
  Notify: NotifyService
  constructor() {
    super("device")
    this.Notify = new NotifyService()
  }
  async getDevice({ deviceId }) {
    const device = await Device.findByPk(deviceId)
    if (!device) {
      GenerateError({ message: this._i18n("deviceNotFound"), code: 404 })
    }
    return { device }
  }

  async getDevices({ currentPage = 1, perPage = 30 }) {
    const { count, rows } = await Device.findAndCountAll({
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { devices: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNotDevicesYet"),
        payload: { devices: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async createDevice({ device }) {
    const instance = await Device.findOne({ where: { token: device.token } })
    this.Notify.subscribeToTopicAll(device.token)
    if (!instance) {
      const result = await Device.create({
        token: device.token,
        userId: device.userId,
      })
      return { device: result }
    }
    if (instance.status === "INACTIVE") {
      device.status = "ACTIVE"
    }
    instance.token = device.token;
    instance.userId = device.userId;
    const result = await instance.save()
    return { device: result }
  }

  async updateDevice({ userId, data }) {
    const device = await Device.findOne({ where: { token: data.token } })
    if (!device) {
      GenerateError({ message: this._i18n("deviceNotFound"), code: 404 })
    }
    device.token = data.token
    device.userId = userId
    device.status = data.status
    const result = await device.save()
    this.Notify.subscribeToTopicAll(data.token)
    return { device: result }
  }

  async removeDevice({ token }) {
    const device = await Device.findOne({ where: { token: token } })
    if (!device) {
      GenerateError({ message: this._i18n("deviceNotFound"), code: 404 })
    }
    this.Notify.unsubscribeFromTopicAll(token)
    device.status = EStatus.DELETED
    await device.save()
  }

  async getUserDevices({ userId }) {
    const userTokens = await Device.findAll({
      where: { userId: { [Op.eq]: userId }, status: "ACTIVE" },
      attributes: ["token"],
    })
    if (!userTokens) {
      return { tokens: [] }
    }
    return { tokens: userTokens.map((device) => device.token) }
  }
  async getUsersDevices({ users }) {
    const userTokens = await Device.findAll({
      where: { userId: users, status: "ACTIVE" },
      attributes: ["token"],
      raw: true,
    })
    if (!userTokens) {
      return { tokens: [] }
    }
    return { tokens: userTokens.map((device) => device.token) }
  }
}
