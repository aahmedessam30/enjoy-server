//Business logic for all Unit Pools routes
import { Pool, UnitPool} from "../../../db";
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"
import { CreateUnitPoolDto } from "./dtos/create-unit-pool.dto"

export default class UnitPoolProvider extends MainProvider {
  constructor() {
    super("unit-pool")
  }

  async getUnitPools ({ unitId }) {
    const {rows, count} = await UnitPool.findAndCountAll({
      attributes: ['id', 'unitId', 'height', 'width', 'length'],
      where: { unitId },
      include: {
        model: Pool,
        attributes: ['id', 'nameAr', 'nameEn'],
      }
    });
    return { unitPools: count > 0 ? rows : [] }
  }

  async create (createUnitPoolDto: CreateUnitPoolDto) {
    const unitPool = await UnitPool.create(createUnitPoolDto);
    return { unitPool }
  }

  async remove ({unitPoolId}) {
    const unitPool = await UnitPool.findByPk(unitPoolId);
    if (!unitPool) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }
    await unitPool.destroy();
  }
}
