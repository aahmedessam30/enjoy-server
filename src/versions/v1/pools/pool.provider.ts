//Business logic for all pool routes
import MainProvider from "../index.provider"
import { Pool } from "../../../db"
import { GenerateError } from "../../../services/error"
import { CreatePoolDto } from "./dtos/create-pool.dto"
import { UpdatePoolDto } from "./dtos/update-pool.dto"
import { PoolStatus } from "../../../interfaces/pool.interface"

export default class PoolProvider extends MainProvider {
  constructor() {
    super("pool")
  }

  async getPools() {
    const { count, rows } = await Pool.findAndCountAll({
      where: { status: PoolStatus.ACTIVE },
      attributes: ['id', 'nameAr', 'nameEn'],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched successfully",
        payload: { pools: rows, totalItems: count, },
        status: "success",
      }
    } else {
      result = { message: this._i18n("thereNoPools"), payload: { pools: [] }, status: "success", }
    }
    return { result }
  }

  async findOne({poolId}) {
    const pool = await Pool.findByPk(poolId)
    if (!pool) {
      GenerateError({ message: this._i18n("poolNotFound"), code: 404 })
    }
    return { pool }
  }

  async adminGetPools({ currentPage, perPage }) {
    const { count, rows } = await Pool.findAndCountAll({
      limit: perPage,
      offset: currentPage * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { pools: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNoPools"),
        payload: { pools: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async create (createPoolDto: CreatePoolDto) {
    const result = await Pool.create(createPoolDto);
    return { pool: result }
  }

  async update (updatePoolDto: UpdatePoolDto) {
    const pool = await Pool.findByPk(updatePoolDto.poolId)
    if (!pool) {
      GenerateError({ message: this._i18n("poolNotFound"), code: 404 })
    }
    pool.nameAr = updatePoolDto.nameAr
    pool.nameEn = updatePoolDto.nameEn
    const result = await pool.save();
    return { pool: result }
  }

  async remove ({ poolId }) {
    const pool = await Pool.findByPk(poolId)
    if (!pool) {
      GenerateError({ message: this._i18n("featureNotFound"), code: 404 })
    }
    pool.status = PoolStatus.DELETED;
    const result = await pool.save()
    return { pool: result }
  }
}
