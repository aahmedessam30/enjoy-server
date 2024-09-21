import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import { CreateRatedCityDto } from "./dtos/create-rated-city.dto"
import RatedCityProvider from "./rated-city.provider"
import { GetRatedCityDto } from "./dtos/get-rated-city.dto"

const RatedCity = new RatedCityProvider()

export default class RatedCityController {
  
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { rated_cities } = await RatedCity.getRatedCities()
      res.status(200).json({ status: "success", payload: { rated_cities }, message: "fetch success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async adminGet(req: Request, res: Response, next: NextFunction) {
    try {
      //@ts-ignore
      const getRatedCityDto: GetRatedCityDto = req.query;
      getRatedCityDto.perPage = Number(req.query.perPage) || 16;
      getRatedCityDto.currentPage = Number(req.query.currentPage) || 1;
      const { result } = await RatedCity.adminGetRatedCities(getRatedCityDto)
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const createRatedCityDto: CreateRatedCityDto = req.body;
      const { ratedCity } = await RatedCity.create(createRatedCityDto);
      res.status(200).json({ message: "created success", payload: { ratedCity }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }

  async remove (req: Request, res: Response, next: NextFunction) {
    try {
      const ratedCityId = req.params.ratedCityId;
      await RatedCity.remove({ratedCityId});
      res.status(200).json({ message: "removed success", payload: { ratedCityId }, status: "success"})
    } catch (err) {
      CatchError(err, next)
    }
  }
}
