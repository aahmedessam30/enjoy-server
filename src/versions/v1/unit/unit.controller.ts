import { Request, Response, NextFunction } from "express";
import { CatchError } from "../../../services/services";
import { CreateUnitDto } from "./dtos/create-unit.dto";
import { FilterUnitsDto } from "./dtos/filter-units.dto";
import UnitProvider from "./unit.provider";

const Unit = new UnitProvider()

export default class Unitcontroller {
  async getUnit(req: Request, res: Response, next: NextFunction) {
    try {
      const { unit } = await Unit.getUnit({ unitId: req.params.unitId, userId: req?.userId  })
      res.status(200).json({ message: "fetched success", payload: { unit }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async checkUnitAvailable (req: Request, res: Response, next: NextFunction) {
    try {
      const checkIn: any = req.query.checkIn;
      const checkOut: any =  req.query.checkOut;
      const { checkAvailable } = await Unit.checkUnitAvailable({ unitId: req.params.unitId, checkIn, checkOut  })
      res.status(200).json({ message: "check success", payload: { checkAvailable }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async list (req: Request, res: Response, next: NextFunction) {
    try {
      //@ts-ignore
      const filterUnitsDto: FilterUnitsDto = req.query;
      filterUnitsDto.perPage = Number(req.query.perPage) || 16;
      filterUnitsDto.currentPage = Number(req.query.currentPage) || 1;
      const { result } = await Unit.list(filterUnitsDto);
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }

  async getArchiveUnits (req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPage, perPage } = req.query
      const { result } = await Unit.getArchiveUnits({ userId: req.userId, currentPage, perPage, })
      res.status(200).json(result)
    } catch (err) {
      CatchError(err, next)
    }
  }

  async getOwnUnits (req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Unit.getOwnUnits({ 
        userId: req.userId,
        currentPage: Number(req.query.currentPage?.toString()),
        perPage: Number(req.query.perPage?.toString())
      })
      res.status(200).json(result);
    } catch (err) {
      CatchError(err, next)
    }
  }

  async getHostUnits (req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Unit.getHostUnits({ 
        userId: req.params?.hostId,
        currentPage: Number(req.query.currentPage?.toString()) || 1,
        perPage: Number(req.query.perPage?.toString()) || 15
      })
      res.status(200).json(result);
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createUnit (req: Request, res: Response, next: NextFunction) {
    try {
      const createUnitDto: CreateUnitDto = req.body;
      const { unit } = await Unit.createUnit(createUnitDto)
      res.status(201).json({ message: "unit created.", payload: { unit }, status: "success", })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async updateUnit (req: Request, res: Response, next: NextFunction) {
    try {
      const { unit } = await Unit.updateUnit({ unitId: req.params.unitId, updateUnitDto: req.body });
      res.status(200).json({
        message: 'unit updated',
        payload: { unitId: unit.id },
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async archiveUnit (req: Request, res: Response, next: NextFunction) {
    try {
      const { unitId } = await Unit.archiveUnit({ unitId: req.params.unitId })
      res.status(200).json({ message: "Unit archived!.'", payload: { unitId }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
