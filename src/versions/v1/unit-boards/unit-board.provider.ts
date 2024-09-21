//Business logic for all Unit Boards routes
import { GenerateError } from "../../../services/error"
import { UnitBoard } from "../../../db"
import MainProvider from "../index.provider"
import { CreateUnitBoardDto } from "./dtos/create-unit-board.dto"

export default class UnitBoardProvider extends MainProvider {
  constructor() {
    super("unit-board")
  }

  async getAll ({ unitId }) {
    const boards = await UnitBoard.findAll({
      where: { unitId },
      attributes: ["id", "description"],
    })
    if (!boards) {
      GenerateError({ message: this._i18n("boardNotFound"), code: 404 });
    }
    return { boards }
  }

  async create (createUnitBoardDto: CreateUnitBoardDto) {
    const board = await UnitBoard.create(createUnitBoardDto);
    return { board }
  }

  async update ({ unitBoardId, updateBoardDto }) {
    const board = await UnitBoard.findByPk(unitBoardId);

    if (!board) {
      GenerateError({ message: this._i18n("boardNotFound"), code: 404 })
    }
  
    board.description = updateBoardDto.description;
   
    const result = await board.save();
  
    return { board: result }
  }
}
