//Business logic for all Unit Features routes
import { Feature, UnitBathroomFeature } from "../../../db";
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"
import { CreateUnitBathroomFeatureDto } from "./dtos/create-unit-bathroom-feature.dto"

export default class UnitBathroomFeatureProvider extends MainProvider {
  constructor() {
    super("unit-feature")
  }

  async getUnitBathroomFeatures ({ unitId }) {
    const {rows, count} = await UnitBathroomFeature.findAndCountAll({
      attributes: ['id', 'unitId'],
      where: { unitId },
      include: {
        model: Feature,
        attributes: ['id', 'nameAr', 'nameEn'],
      }
    });
    return { features: count > 0 ? rows : [] }
  }

  async addUnitBathroomFeatures (createUnitBathroomFeatureDto: CreateUnitBathroomFeatureDto) {
    const records = createUnitBathroomFeatureDto?.bathroomFeatures?.map(e => ({unitId: createUnitBathroomFeatureDto?.unitId, featureId: e}));
    const unitBathroomFeatures = await UnitBathroomFeature.bulkCreate(records);
    return { unitBathroomFeatures }
  }

  async remove ({unitBathroomFeatureId}) {
    const unitFeature = await UnitBathroomFeature.findByPk(unitBathroomFeatureId);
    if (!unitFeature) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }
    await unitFeature.destroy();
  }
}
