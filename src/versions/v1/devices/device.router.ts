import { Router } from "express"
import DevicesController from "./device.controller"
import { isAuth } from "../../../middlewares/auth.old"

export default class devicerouter {
  router: Router
  private devicesController = new DevicesController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.get("/devices/:deviceId", this.devicesController.getDevice)

    this.router.get("/devices", this.devicesController.getDevices)

    this.router.post("/devices", this.devicesController.createDevice)

    this.router.patch("/devices", isAuth, this.devicesController.updateDevice)

    this.router.delete("/devices", isAuth, this.devicesController.removeDevice)
  }
  private validator(route: string) {}
}
