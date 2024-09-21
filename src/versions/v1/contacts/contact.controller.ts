import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import ContactProvider from "./contact.provider"

const Contact = new ContactProvider()

export default class ContactController {
  async list (req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0;
      const perPage = Number(req.query.perPage) || 30;
      const { result } = await Contact.list({ currentPage, perPage })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { contact } = await Contact.create({
        name: req.body.name, 
        message: req.body?.message, 
        mobile: req.body?.mobile,
        email: req.body.email,
      })
      res.status(200).json({ 
        payload: { contact }, 
        message: "contact created", 
        status: "success" 
      })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const contactId: any = req.query.contactId;
      await Contact.remove({ uuid: contactId })
      res.status(200).json({ message: "contact removed", status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
}
