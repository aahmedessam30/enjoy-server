//Business logic for all Unit Location routes
import { GenerateError } from "../../../services/error"
import { UnitLocation, City, District } from "../../../db"
import MainProvider from "../index.provider"
import { CreateUnitLocationDto } from "./dtos/create-unit-location.dto"

export default class UnitLocationProvider extends MainProvider {
  constructor() {
    super("unit-location")
  }

  async getUnitLocation ({ unitId }) {
    const location = await UnitLocation.findOne({
      where: { unitId },
      attributes: ["id", "lat", "lng", "address1"],
      include: [
        { model: City, attributes: ["id", "nameAr", "nameEn"] },
        { model: District, attributes: ["id", "nameAr", "nameEn"] },
      ],
    })
    if (!location) {
      GenerateError({ message: this._i18n("locationNotFound"), code: 404 })
    }
    return { location }
  }

  async createUnitLocation (createUnitLocationDto: CreateUnitLocationDto) {
    const location = await UnitLocation.create(createUnitLocationDto);
    return { location }
  }

  async updateUnitLocation ({ unitId, updateLocationDto }) {
    const location = await UnitLocation.findOne({
      where: { unitId },
    });

    if (!location) {
      GenerateError({ message: this._i18n("locationNotFound"), code: 404 })
    }
  
    location.lng = updateLocationDto.lng
    location.lat = updateLocationDto.lat
    location.address1 = updateLocationDto.location
    location.cityId = updateLocationDto.cityId
    location.districtId = updateLocationDto.districtId;
  
    const result = await location.save();
  
    return { location: result }
  }
}
