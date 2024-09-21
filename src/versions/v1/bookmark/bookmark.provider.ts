import { GenerateError } from "../../../services/services"
import {Bookmark, Unit, UnitLocation, Image, City, District} from "../../../db"
import MainProvider from "../index.provider"
import { FilterBookmarkListDto } from "./dtos/filter-bookmark-list.dto"
import { IBookmark } from "../../../interfaces/bookmark.interface"
import { CreateBookmarkDto } from "./dtos/create-bookmark.dto"

export default class BookmarkProvider extends MainProvider {
  constructor() {
    super("bookmark")
  }
  async list(filterBookmarkListDto: FilterBookmarkListDto): Promise<{bookmarks: IBookmark[], total: number }> {
    const { count, rows } = await Bookmark.findAndCountAll({
      attributes: ['id', 'createdAt'],
      distinct: true,
      where: {userId: filterBookmarkListDto.userId},
      include: [
        { 
          model: Unit,
          attributes: {'exclude': ['userId', 'categoryId', 'status']},
          include: [
            { model: Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
            {
              model: UnitLocation,
              attributes: ["id", "cityId", "districtId"],
              required: true,
              include: [
                { model: City, attributes: ["id", "nameAr", "nameEn"] },
                { model: District, attributes: ["id", "nameAr", "nameEn"] },
              ],
            },
          ],
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: filterBookmarkListDto.perPage,
      offset: (filterBookmarkListDto.currentPage - 1) * filterBookmarkListDto.perPage,
    })
    return { bookmarks: rows, total: count }
  }

  async add(createBookmarkDto: CreateBookmarkDto): Promise<{bookmark: Bookmark}> {
    const result = await Unit.findByPk(createBookmarkDto.unitId)
    if (!result) {
      GenerateError({ message: this._i18n("notFound"), code: 404 })
    }
    const isAddBefore = await Bookmark.count({
      where: { userId: createBookmarkDto.userId, unitId: createBookmarkDto.unitId },
    })
    if (isAddBefore != 0) {
      GenerateError({ message: this._i18n("bookmarkAddDefore"), code: 400 })
    }
    const bookmarkInserted = await Bookmark.create(createBookmarkDto);
    const bookmark = await Bookmark.findOne({
      attributes: ['id', 'createdAt'],
      where: {id: bookmarkInserted.id},
      include: [
        { 
          model: Unit,
          attributes: {'exclude': ['userId', 'categoryId', 'status']},
          include: [
            { model: Image, attributes: ["id", this.concatImg("url"), "type"], through: { attributes: [] } },
            {
              model: UnitLocation,
              attributes: ["id", "lat", "lng", "address1"],
              required: true,
            },
          ],
        }
      ],
    })
    return { bookmark }
  }

  async remove({ bookmarkId }) {
    const bookmark = await Bookmark.findByPk(bookmarkId)
    if (!bookmark) {
      GenerateError({ message: this._i18n("bookmarkNotFound"), code: 404 })
    }
    await Bookmark.destroy({ where: { id: bookmarkId } })
  }
}
