//Business logic for all Contact routes
import { GenerateError } from "../../../services/services"
import { Contact } from "../../../db"

export default class ContactProvider {
  async create (createDto: {name: string, email?: string, mobile: string, message: string}) {
    const contact = await Contact.create(createDto);
    return { contact }
  }

  async list ({ currentPage, perPage }) {
    const { count, rows } = await Contact.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: perPage,
      offset: currentPage * perPage,
    })
    let result: { payload: object; status: string }
    if (count > 0) {
      result = {
        payload: {
          contacts: rows,
          totalItems: count,
          currentPage,
          limit: perPage,
        },
        status: "success",
      }
    } else {
      result = {
        payload: { contacts: [], totalItems: count, currentPage, limit: perPage },
        status: "success",
      }
    }
    return { result }
  }

  async remove ({ uuid }: { uuid: string }) {
    const contact = await Contact.findByPk(uuid)
    if (!contact) {
      GenerateError({ message: "contact is not found.", code: 404 })
    }
    await contact.destroy();
  }
}
