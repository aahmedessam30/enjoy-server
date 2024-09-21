//Business logic for all Unit Features routes
import { UnitKitchenFeature, Feature } from "../../../db";
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"
import { CreateUnitKitchenFeatureDto } from "./dtos/create-unit-kitchen-feature.dto"

export default class UnitKitchenFeatureProvider extends MainProvider {
  constructor() {
    super("unit-kitchen-feature")
  }

  async getUnitKitchenFeatures ({ unitId }) {
    const {rows, count} = await UnitKitchenFeature.findAndCountAll({
      attributes: ['id', 'unitId'],
      where: { unitId },
      include: {
        model: Feature,
        attributes: ['id', 'nameAr', 'nameEn'],
      }
    });
    return { features: count > 0 ? rows : [] }
  }

  async addUnitKitchenFeatures (createUnitFeatureDto: CreateUnitKitchenFeatureDto) {
    const records = createUnitFeatureDto?.kitchenFeatures?.map(e => ({unitId: createUnitFeatureDto?.unitId, featureId: e}));
    const unitKitchenFeatures = await UnitKitchenFeature.bulkCreate(records);
    return { unitKitchenFeatures }
  }

  async remove ({unitKitchenFeatureId}) {
    const unitFeature = await UnitKitchenFeature.findByPk(unitKitchenFeatureId);
    if (!unitFeature) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }
    await unitFeature.destroy();
  }
}
