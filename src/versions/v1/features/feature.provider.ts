//Business logic for all feature routes
import MainProvider from "../index.provider"
import { Feature } from "../../../db"
import { FeatureStatus } from "../../../interfaces/feature.interface"
import { GenerateError } from "../../../services/error"
import { CreateFeatureDto } from "./dtos/create-feature.dto"
import { UpdateFeatureDto } from "./dtos/update-feature.dto"

export default class FeatureProvider extends MainProvider {
  constructor() {
    super("feature")
  }

  async getFeatures() {
    const { count, rows } = await Feature.findAndCountAll({
      where: { status: FeatureStatus.ACTIVE },
      attributes: ['id', 'nameAr', 'nameEn', 'type']
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched success",
        payload: { features: rows, totalItems: count, },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNoFeatures"),
        payload: { features: [] },
        status: "success",
      }
    }
    return { result }
  }

  async getFeaturesByType ({featureType}) {
    const {rows, count} = await Feature.findAndCountAll({
      attributes: ["id", "nameAr", "nameEn"],
      where: { status: FeatureStatus.ACTIVE, type: featureType },
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched successfully",
        payload: { features: rows },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNoFeatures"),
        payload: { features: [] },
        status: "success",
      }
    }
    return { result }
  }

  async adminGetFeatures ({ currentPage = 0, perPage = 10, type }) {
    let filter = {}
    if(type) {
      filter = Object.assign(filter, {type : type});
    }
    const { count, rows } = await Feature.findAndCountAll({
      where: filter,
      limit: perPage,
      offset: currentPage * perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched Success",
        payload: { features: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNoFeatures"),
        payload: { features: [], totalItems: count },
        status: "success",
      }
    }
    return { result }
  }

  async findOne({featureId}) {
    const feature = await Feature.findByPk(featureId)
    if (!feature) {
      GenerateError({ message: this._i18n("featureNotFound"), code: 404 })
    }
    return { feature }
  }

  async createFeature(createFeatureDto: CreateFeatureDto) {
    const result = await Feature.create(createFeatureDto);
    return { feature: result }
  }

  async updateFeature(updateFeatureDto: UpdateFeatureDto) {
    const feature = await Feature.findByPk(updateFeatureDto.featureId)
    if (!feature) {
      GenerateError({ message: this._i18n("featureNotFound"), code: 404 })
    }
    feature.nameAr = updateFeatureDto.nameAr
    feature.nameEn = updateFeatureDto.nameEn
    feature.type = updateFeatureDto.type
    const result = await feature.save();
    return { feature: result }
  }

  async removeFeature({ featureId }) {
    const feature = await Feature.findByPk(featureId)
    if (!feature) {
      GenerateError({ message: this._i18n("featureNotFound"), code: 404 })
    }
    feature.status = FeatureStatus.DELETED
    const result = await feature.save()
    return { feature: result }
  }
}
