import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import InfoProvider from "./info.provider"

const Info = new InfoProvider()

export default class InfoController {
  /**
   * Create new info
   * @param {*} req new fields in body
   * @param {*} res status 201 if created
   * @param {*} next Catch Error
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { info } = await Info.create({
        body: req.body,
      })
      res.status(201).json({ message: "Info created.", payload: { info }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * Update info
   * @param {body} req The fields to be modified
   * @param {*} res status 200 if updated
   * @param {*} next Catch Error
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Info.update({
        infoId: req.params.infoId,
        body: req.body,
      })
      res.status(200).json({ message: "info updated.", payload: { result }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * List info with pagination method
   * @param {body} req The fields to be modified
   * @param {*} res status 200 if updated
   * @param {*} next Catch Error
   */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Info.list({
        limit: req.query.limit,
        page: req.query.page,
      })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }
  async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const keys = String(req.query.keys).split(",")
      const { result } = await Info.getOption({ keys })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
}
