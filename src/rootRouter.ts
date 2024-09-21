import { Application } from "express"
import { MainRouter as V1 } from "./versions/v1/router"

function router(app: Application) {
  app.use("/api/v1", new V1().router)
}

export default router
