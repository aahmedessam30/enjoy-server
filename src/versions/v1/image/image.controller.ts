import { CatchError } from "../../../services/services"
import { Request, Response, NextFunction } from "express"
import ImageProvider from "./image.provider"
import { CreateImageDto } from "./dtos/create-image.dto"

const Image: ImageProvider = new ImageProvider()

export default class ImageController {
  /**
   * Add new image
   * @param {body} req new fields
   * @param {*} res status 201 if created
   * @param {*} next Catch Error
   */
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { module, moduleId, images } = req.body
      const { result } = await Image.add({ module, moduleId, images })
      res.status(201).json({ message: "images added successfully", payload: {images: result}, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * Add new image
   * @param {body} req new fields
   * @param {*} res status 201 if created
   * @param {*} next Catch Error
   */
  async addSingle (req: Request, res: Response, next: NextFunction) {
    try {
      const createImageDto: CreateImageDto = req.body
      const { image } = await Image.addSingle(createImageDto);
      res.status(201).json({ message: "image added success", payload: { image }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * Remove image
   * @param {*} req image id in param
   * @param {*} res status 200 if created
   * @param {*} next Catch Error
   */
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = req.params
      await Image.remove({ imageId })
      res.status(200).json({
        message: "image removed successfully",
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
