//Business logic for all Unit Features routes
import { Unit } from "../../../db";
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"
import { CreateUnitFeatureDto } from "./dtos/create-unit-feature.dto"

export default class UnitFeatureProvider extends MainProvider {
  constructor() {
    super("unit-feature")
  }

  async getUnitFeatures ({ unitId }) {
    const unit = await Unit.findByPk(unitId);
    if (!unit) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }
    const features = await unit.getFeatures({
      joinTableAttributes: [],
      attributes: ['id', 'nameAr', 'nameEn']
    })
  
    return { features }
  }

  async addUnitFeatures (createUnitFeatureDto: CreateUnitFeatureDto) {
    const unit = await Unit.findByPk(createUnitFeatureDto.unitId);
    if (!unit) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }
    const unitFeatures = await unit.addFeature(createUnitFeatureDto.features)
    return { unitFeatures }
  }
}
