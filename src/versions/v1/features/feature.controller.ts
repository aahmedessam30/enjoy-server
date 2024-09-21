import { Request, Response, NextFunction } from "express"
import { FeatureType } from "../../../interfaces/feature.interface"
import { CatchError } from "../../../services/services"
import { CreateFeatureDto } from "./dtos/create-feature.dto"
import { UpdateFeatureDto } from "./dtos/update-feature.dto"
import FeatureProvider from "./feature.provider"

const Feature = new FeatureProvider()

export default class FeatureController {
  async getFeatures(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Feature.getFeatures()
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getFeaturesByType (req: Request, res: Response, next: NextFunction) {
    try {
      const featureType = req.params.featureType || FeatureType.GENERAL;
      const { result } = await Feature.getFeaturesByType({featureType})
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { feature } = await Feature.findOne({featureId: req.params.featureId})
      res.status(200).json({ message: "success", payload: { feature }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async adminGetFeatures (req: Request, res: Response, next: NextFunction) {
    try {
      const currentPage = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 10
      const type = req.params.type;
      const { result } = await Feature.adminGetFeatures({ currentPage, perPage, type })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }

  async createFeature(req: Request, res: Response, next: NextFunction) {
    try {
      const createFeatureDto: CreateFeatureDto =  req.body;
      const { feature } = await Feature.createFeature(createFeatureDto)
      res.status(201).json({ message: "feature created.", payload: { feature }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async updateFeature(req: Request, res: Response, next: NextFunction) {
    try {
      const updateFeatureDto: UpdateFeatureDto =  req.body;
      updateFeatureDto.featureId = req.params.featureId
      const { feature } = await Feature.updateFeature(updateFeatureDto)
      res.status(201).json({ message: "feature updated.", payload: { feature }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }

  async removeFeature(req: Request, res: Response, next: NextFunction) {
    try {
      await Feature.removeFeature({ featureId: req.params.featureId })
      res.status(201).json({ message: "feature deleted.", status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
}
