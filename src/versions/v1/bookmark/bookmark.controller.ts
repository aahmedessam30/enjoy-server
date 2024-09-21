import { CatchError  } from "../../../services/services"
import BookmarkProvider from "./bookmark.provider"
import { Request, Response, NextFunction } from "express"
import { CreateBookmarkDto } from "./dtos/create-bookmark.dto"
import { FilterBookmarkListDto } from "./dtos/filter-bookmark-list.dto"

const Bookmark = new BookmarkProvider()

export default class BookmarkController {
  /**
   * list bookmarks
   * @param {query} req new fields
   * @param {*} res status 200 if get success
   * @param {*} next Catch Error
   */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const filterBookmarkListDto = new FilterBookmarkListDto();
      filterBookmarkListDto.userId = req?.userId;
      filterBookmarkListDto.currentPage = Number(req?.query?.page) || 1;
      filterBookmarkListDto.perPage = Number(req?.query?.perPage) || 15;
      const { bookmarks, total } = await Bookmark.list(filterBookmarkListDto);
      res.status(200).json({
        message: "list bookmarks success",
        payload: { 
          bookmarks,
          currentPage: filterBookmarkListDto.currentPage,
          total,
          limit: filterBookmarkListDto.perPage
        },
        status: "success" 
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * Add new bookmark
   * @param {body} req new fields
   * @param {*} res status 201 if created
   * @param {*} next Catch Error
   */
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const createBookmarkDto: CreateBookmarkDto = req.body
      createBookmarkDto.userId = req?.userId;
      const { bookmark } = await Bookmark.add(createBookmarkDto);
      res.status(201).json({ message: "bookmark added success", payload: {bookmark}, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  /**
   * Remove bookmark
   * @param {*} req bookmark id in param
   * @param {*} res status 200 if created
   * @param {*} next Catch Error
   */
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookmarkId } = req.params
      await Bookmark.remove({ bookmarkId })
      res.status(200).json({
        message: "bookmark removed successfully",
        payload: {bookmarkId},
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
