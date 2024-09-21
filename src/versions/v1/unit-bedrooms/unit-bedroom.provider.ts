//Business logic for all Unit Bedrooms routes
import { GenerateError } from "../../../services/error"
import { UnitBedroom } from "../../../db"
import MainProvider from "../index.provider"
import { CreateUnitBedroomDto } from "./dtos/create-unit-bedroom.dto"

export default class UnitBedroomProvider extends MainProvider {
  constructor() {
    super("unit-bedroom")
  }

  async getOne ({ unitId }) {
    const bedroom = await UnitBedroom.findOne({
      where: { unitId },
      attributes: ["id", "roomCount", "singleBedCount", "masterBedCount"],
    })
    if (!bedroom) {
      GenerateError({ message: this._i18n("bedroomNotFound"), code: 404 });
    }
    return { bedroom }
  }

  async create (createUnitBedroomDto: CreateUnitBedroomDto) {
    const bedroom = await UnitBedroom.create(createUnitBedroomDto);
    return { bedroom }
  }

  async update ({ unitBedroomId, updateBedroomDto }) {
    const bedroom = await UnitBedroom.findByPk(unitBedroomId);

    if (!bedroom) {
      GenerateError({ message: this._i18n("bedroomNotFound"), code: 404 })
    }
  
    bedroom.roomCount = updateBedroomDto.roomCount;
    bedroom.singleBedCount = updateBedroomDto.singleBedCount;
    bedroom.masterBedCount = updateBedroomDto.masterBedCount;
  
    const result = await bedroom.save();
  
    return { bedroom: result }
  }
}
