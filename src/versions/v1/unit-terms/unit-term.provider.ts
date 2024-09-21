//Business logic for all Unit Terms routes
import { GenerateError } from "../../../services/error"
import { UnitTerm } from "../../../db"
import MainProvider from "../index.provider"
import { CreateUnitTermDto } from "./dtos/create-unit-term.dto"

export default class UnitTermProvider extends MainProvider {
  constructor() {
    super("unit-term")
  }

  async getAll ({ unitId }) {
    const terms = await UnitTerm.findAll({
      where: { unitId },
      attributes: ["id", "description"],
    })
    return { terms: terms?.length > 0 ? terms : [] }
  }

  async create (createUnitTermDto: CreateUnitTermDto) {
    const term = await UnitTerm.create(createUnitTermDto);
    return { term }
  }

  async update ({ unitTermId, updateTermDto }) {
    const term = await UnitTerm.findByPk(unitTermId);

    if (!term) {
      GenerateError({ message: this._i18n("termNotFound"), code: 404 })
    }
  
    term.description = updateTermDto.description;
   
    const result = await term.save();
  
    return { term: result }
  }

  async remove ({unitTermId}) {
    const term = await UnitTerm.findByPk(unitTermId);
    if (!term) {
      GenerateError({ message: this._i18n("termNotFound"), code: 404 })
    }
    await term.destroy();
  }
}
