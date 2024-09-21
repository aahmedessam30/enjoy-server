import { Router } from "express"
import Media from "./media.service"
import multer from "multer"

const UnitsMedia = new Media({ url: "fra1.digitaloceanspaces.com/uploads/enjoy"})

export default class MediaRouter {
  router: Router
  storage = multer.memoryStorage()
  upload = multer({ storage: this.storage })

  constructor() {
    this.router = Router()
    this.routes()
  }
  private routes() {
    this.router.post("/image/units", this.upload.array("image", 1), UnitsMedia.ImageWatermark)

    this.router.post("/upload-image", this.upload.array("image", 1), UnitsMedia.smallImage)

    this.router.post("/images/units", this.upload.array("image", 10), UnitsMedia.ImagesWatermark)
  }
  private validator(route: string) {}
}
