import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { CatchError, GenerateError } from "../../../services/services"
import DeviceProvider from "./device.provider"

const Device = new DeviceProvider()

export default class DevicesController {
  async getDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
      }
      const { device } = await Device.getDevice({ deviceId: req.params.deviceId })
      res.status(200).json({
        message: "fetched successfully",
        payload: { device },
        status: "success",
      })
    } catch (e) {
      CatchError(e, next)
    }
  }
  async getDevices(req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 1
      const perPage = Number(req.query.perPage) || 30
      const { result } = await Device.getDevices({ currentPage, perPage })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async createDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
      }
      const { device } = await Device.createDevice({ device: req.body })
      res.status(201).json({ message: "Device created.", payload: { device }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  async updateDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const { device } = await Device.updateDevice({
        userId: req.userId,
        data: req.body,
      })
      res.status(201).json({
        message: "Device updated.",
        payload: { device },
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
  async removeDevice(req: Request, res: Response, next: NextFunction) {
    try {
      await Device.removeDevice({
        token: req.body.token,
      })
      res.status(201).json({
        message: "Device removed.",
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
