//Business logic for all Unit Routes
import { GenerateError } from "../../../services/services"
import {
  Unit,
  User,
  UnitLocation,
  City,
  District,
  Category,
  Feature,
  Image,
  UnitKitchenFeature,
  UnitBathroomFeature,
  Pool,
  UnitPool,
  UnitBedroom,
  UnitBoard,
  UnitTerm,
  Bookmark,
  Reservation,
} from "../../../db"
import { Op } from "sequelize"
import MainProvider from "../index.provider"
import { IUnit, UnitStatus } from "../../../interfaces/unit.interface"
import { CreateUnitDto } from "./dtos/create-unit.dto"
import { UpdateUnitDto } from "./dtos/update-unit.dto"
import { FilterUnitsDto } from "./dtos/filter-units.dto"
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { IReservation, ReservationStatus } from "../../../interfaces/reservation.interface"

const Moment = extendMoment(moment as any);

export default class UnitProvider extends MainProvider {
  constructor() {
    super("unit")
  }

  async getUnit ({ unitId, userId }) {
    const isBookmarked = await Bookmark.count({where: {unitId, userId}});
    const unit = await Unit.findOne({
      where: { id: unitId },
      include: [
        {
          model: UnitLocation,
          attributes: ["id", "lat", "lng", "address1"],
          include: [
            { model: City, attributes: ["id", "nameAr", "nameEn"] },
            { model: District, attributes: ["id", "nameAr", "nameEn"] },
          ],
        },
        { model: Category, attributes: ["id", "nameAr", "nameEn"] },
        { model: User, attributes: ["id", "name"] },
        { model: Image, attributes: ["id", this.concatImg("url")] },
        {
          model: Feature,
          attributes: ["id", "nameAr", "nameEn"],
          through: { attributes: [] },
        },
        {
          model: UnitKitchenFeature,
          attributes: ["id"],
          include: [
            {
              model: Feature,
              attributes: ['id', 'nameAr', 'nameEn'],
            }
          ]
        },
        {
          model: UnitBathroomFeature,
          attributes: ["id"],
          include: [
            {
              model: Feature,
              attributes: ['id', 'nameAr', 'nameEn'],
            }
          ]
        },
        {
          model: UnitPool,
          attributes: ["id", 'width', 'height', 'length'],
          include: [
            {
              model: Pool,
              attributes: ['id', 'nameAr', 'nameEn'],
            }
          ]
        },
        {
          model: UnitBedroom,
          attributes: ["id", 'roomCount', 'masterBedCount', 'singleBedCount'],
        },
        { model: UnitBoard, attributes: ["id", 'description'] },
        { model: UnitTerm, attributes: ["id", 'description'] },
      ],
    })

    if (!unit) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }
    //check if user bookmarked the unit.
    unit.setDataValue('isBookmarked', isBookmarked > 0 ? true : false);

    return { unit }
  }

  async checkUnitAvailable ({ unitId, checkIn, checkOut }: {unitId: string; checkIn?: string; checkOut?: string;}) {
    const start = Moment(checkIn, 'YYYY-MM-DD');
    const end   = Moment(checkOut, 'YYYY-MM-DD');
    const rangeOfCheck =  Array.from(Moment?.range(start, end)?.by('day'))?.map(e => new Date(e?.format('YYYY-MM-DD')));

    const unit: IUnit = await Unit.findOne({
      where: {id: unitId, status: UnitStatus.ACTIVE},
      attributes: ['id', 'status'],
      include: {
        model: Reservation,
        where: { 
          status: ReservationStatus.RESERVED, 
          [Op.or]: [
            { checkIn: {[Op.in]: rangeOfCheck} }, 
            { checkOut: {[Op.in]: rangeOfCheck} }
          ]
        } 
      }
    })

    let checkAvailable = { available: true };

    if(unit) {
      checkAvailable.available = false;
    }  
    return { checkAvailable }
  }

  async list (filterUnitsDto: FilterUnitsDto) {
    let filterByLocation = {}
    let filterByAttributes = {}
    let reservedUnitIds = [];
  
    const startDate = filterUnitsDto.startDate;
    const endDate = filterUnitsDto.endDate;
    const rangeOfCheck =  Array.from(Moment?.range(startDate, endDate)?.by('day'))?.map(e => new Date(e?.format('YYYY-MM-DD')));
    
    if (filterUnitsDto.categories?.length > 0) {
      const cats = filterUnitsDto?.categories?.split(',');
      filterByAttributes = Object.assign(filterByAttributes, { categoryId: {[Op.in]: cats} })
    }

    if (rangeOfCheck?.length > 0) {
      const rows = await Reservation.findAll({
        attributes: ['unitId'],
        where: {
          status: ReservationStatus.RESERVED, 
          [Op.or]: [
            { checkIn: {[Op.in]: rangeOfCheck} }, 
            { checkOut: {[Op.in]: rangeOfCheck} }
          ]
        },
      })
      if(rows) {
        reservedUnitIds = rows.map((reservation: IReservation) => reservation?.unitId);
      } else {
        reservedUnitIds = [];
      }
    }

    if (filterUnitsDto.minPrice) {
      filterByAttributes = Object.assign(filterByAttributes, { price: { [Op.gte]: filterUnitsDto.minPrice } })
    }

    if (filterUnitsDto.maxPrice) {
      filterByAttributes = Object.assign(filterByAttributes, { price: { [Op.lte]: filterUnitsDto.maxPrice } })
    }

    if (filterUnitsDto.cityId) {
      filterByLocation = Object.assign(filterByLocation, { cityId: filterUnitsDto.cityId })
    };

    if(reservedUnitIds?.length > 0) {
      filterByAttributes = Object.assign(filterByAttributes, { id: { [Op.notIn]: reservedUnitIds } })
    }

    const { count, rows } = await Unit.findAndCountAll({
      distinct: true,
      attributes: {'exclude': ['userId', 'categoryId', 'status']},
      include: [
        { model: Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
        { model: Category, attributes: ["id", "nameAr", "nameEn"] },
        {
          model: UnitLocation,
          attributes: ["id", "cityId", "districtId"],
          where: {...filterByLocation},
          right: true,
          include: [
            { model: City, attributes: ["id", "nameAr", "nameEn"] },
            { model: District, attributes: ["id", "nameAr", "nameEn"] },
          ],
        },
      ],
      where: { status: UnitStatus.ACTIVE , ...filterByAttributes },
      order: [["updatedAt", "DESC"]],
      limit: filterUnitsDto.perPage,
      offset: (filterUnitsDto.currentPage - 1) * filterUnitsDto.perPage,
    })

    let result: { message: string; payload: object; status: string }

    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: {
          units: rows,
          totalItems: count,
          currentPage: filterUnitsDto.currentPage,
          limit: filterUnitsDto.perPage
        },
        status: "success",
      }
    } else {
      result = {
        message: "There are not units yet.!",
        payload: {
          units: [],
          totalItems: count,
          currentPage: filterUnitsDto.currentPage,
          limit: filterUnitsDto.perPage
        },
        status: "success",
      }
    }
    return { result }
  }

  async getArchiveUnits ({ userId, currentPage, perPage }) {
    const { count, rows } = await Unit.findAndCountAll({
      distinct: true,
      attributes: [ "id", "titleAr", "titleEn", "details", "priceByDay", "discount", "createdAt", "updatedAt", "status", ],
      include: [
        { model: Image, attributes: ["id", this.concatImg("url"), "type"],  through: { attributes: [] } },
        { model: Category, attributes: ["id", "nameAr", "nameEn"] },
        {
          model: UnitLocation,
          attributes: ["address1"],
          include: [
            { model: City, attributes: ["id", "nameAr", "nameEn"] },
            { model: District, attributes: ["id", "nameAr", "nameEn"] },
          ],
        },
      ],
      where: { status: UnitStatus.ARCHIVE , userId: userId },
      order: [["updatedAt", "DESC"]],
      limit: perPage,
      offset: (currentPage - 1) * perPage,
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched archived units successfully",
        payload: { properties: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: "There are not archived units.!",
        payload: { properties: [], totalItems: 0 },
        status: "success",
      }
    }
    return { result }
  }

  async getOwnUnits ({ userId, currentPage = 1, perPage = 15 }) {
    const { count, rows } = await Unit.findAndCountAll({
      distinct: true,
      include: [
        { model: Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
        { model: Category, attributes: ["id", "nameAr", "nameEn"] },
        {
          model: UnitLocation,
          attributes: ["id", "address1"],
          include: [
            { model: City, attributes: ["id", "nameAr", "nameEn"] },
            { model: District, attributes: ["id", "nameAr", "nameEn"] },
          ],
        },
      ],
      where: { userId: userId },
      order: [["updatedAt", "DESC"]],
      // limit: perPage,
      // offset: (currentPage - 1) * perPage,
    })

    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched units successfully",
        payload: { units: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: "There are not units yet.!",
        payload: { units: [], totalItems: 0 },
        status: "success",
      }
    }
    return { result }
  }

  async getHostUnits ({ userId, currentPage = 1, perPage = 15 }) {
    const { count, rows } = await Unit.findAndCountAll({
      distinct: true,
      include: [
        { model: Category, attributes: ["id", "nameAr", "nameEn"] },
      ],
      where: { userId: userId },
      order: [["updatedAt", "DESC"]],
      limit: perPage,
      offset: (currentPage - 1) * perPage,
    })

    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "fetched units successfully",
        payload: { units: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: "There are not units yet.!",
        payload: { units: [], totalItems: 0 },
        status: "success",
      }
    }
    return { result }
  }

  async createUnit (createUnitDto: CreateUnitDto) {
    const unit = await Unit.create(createUnitDto);
    if (!unit) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 });
    }
    return { unit }
  }

  async updateUnit({ unitId, updateUnitDto }: {unitId: string, updateUnitDto: UpdateUnitDto}) {
    const unit = await Unit.findByPk(unitId)
    if (!unit) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }

    updateUnitDto.titleAr && (unit.titleAr = updateUnitDto.titleAr)
    updateUnitDto.titleEn && (unit.titleEn = updateUnitDto.titleEn)
    updateUnitDto.dedicatedTo && (unit.dedicatedTo = updateUnitDto.dedicatedTo)
    updateUnitDto.insurance && (unit.insurance = updateUnitDto.insurance)
    updateUnitDto.details && (unit.details = updateUnitDto.details)
    updateUnitDto.discount && (unit.discount = updateUnitDto.discount)
    updateUnitDto.priceByDay && (unit.priceByDay = updateUnitDto.priceByDay)
    updateUnitDto.space && (unit.space = updateUnitDto.space)
    updateUnitDto.priceByDay && (unit.priceByDay = updateUnitDto.priceByDay)
    updateUnitDto.appVersion && (unit.appVersion = updateUnitDto.appVersion)
    updateUnitDto.bathroomCount && (unit.bathroomCount = updateUnitDto.bathroomCount)
    
    const result = await unit.save({ silent: true });
    return { unit: result }
  }

  async archiveUnit ({ unitId } : {unitId: string}) {
    const unit = await Unit.findByPk(unitId);

    if (!unit) {
      GenerateError({ message: this._i18n("unitNotFound"), code: 404 })
    }

    unit.status = UnitStatus.ARCHIVE

    const result = await unit.save()

    return { unitId: result.id }
  }
}
