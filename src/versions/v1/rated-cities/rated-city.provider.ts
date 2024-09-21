//Business logic for all Unit Pools routes
import { City, Image, RatedCity } from "../../../db";
import { RatedCityStatus } from "../../../interfaces/reated-city.interface";
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"
import { CreateRatedCityDto } from "./dtos/create-rated-city.dto"
import { GetRatedCityDto } from "./dtos/get-rated-city.dto";

export default class RatedCityProvider extends MainProvider {
  constructor() {
    super("rated-city")
  }

  async getRatedCities () {
    const {rows, count} = await RatedCity.findAndCountAll({
      attributes: ['id', 'rate'],
      where: { status: RatedCityStatus.ACTIVE },
      include: [
        { model: Image, attributes: ['id', this.concatImg('url')] },
        { model: City, attributes: ['id', 'nameEn', 'nameAr']}
      ],
      order: [['rate', 'DESC']]
    });
    return { rated_cities: count > 0 ? rows : [] }
  }

  async adminGetRatedCities (getRatedCityDto: GetRatedCityDto) {
    const {rows, count} = await RatedCity.findAndCountAll({
      attributes: ['id', 'rate'],
      include: [
        { model: Image, attributes: ['id', this.concatImg('url')] },
        { model: City, attributes: ['id', 'nameEn', 'nameAr']}
      ],
      order: [['rate', 'DESC']],
      limit: getRatedCityDto.perPage,
      offset: (getRatedCityDto.currentPage - 1) * getRatedCityDto.perPage,
    });
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched success",
        payload: {
          rated_cities: rows,
          totalItems: count,
          currentPage: getRatedCityDto.currentPage,
          limit: getRatedCityDto.perPage
        },
        status: "success",
      }
    } else {
      result = {
        message: "There are not rated cities yet.!",
        payload: {
          ratec_cities: [],
          totalItems: count,
          currentPage: getRatedCityDto.currentPage,
          limit: getRatedCityDto.perPage
        },
        status: "success",
      }
    }
    return { result }
  }

  async create (createRatedCityDto: CreateRatedCityDto) {
    const ratedCity = await RatedCity.create(createRatedCityDto);
    return { ratedCity }
  }

  async remove ({ratedCityId}) {
    const ratedCity = await RatedCity.findByPk(ratedCityId);
    if (!ratedCity) {
      GenerateError({ message: this._i18n("cityNotFound"), code: 404 })
    }
    ratedCity.status = RatedCityStatus.DELETED;
    await ratedCity.save();
  }
}
