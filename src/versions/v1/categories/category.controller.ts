import { CatchError } from "../../../services/services"
import CategoryProvider from "./category.provider"
import { Request, Response, NextFunction } from "express"

const Category: CategoryProvider = new CategoryProvider()

export default class CategoryController {
  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = await Category.getCategory({ categoryId: req.params.categoryId })
      res.status(200).json({ status: "success", payload: { category }, message: "fetched successfully" })
    } catch (error) {
      CatchError(error, next)
    }
  }
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Category.getCategories()
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async getCategoriesWithFilters(req: Request, res: Response, next: NextFunction) {
    try {
      const { result } = await Category.getCategoriesWithFilters()
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async getDashboardCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 0
      const perPage = Number(req.query.perPage) || 6;
      const { result } = await Category.getDashboardCategories({ page, perPage })
      res.status(200).json(result)
    } catch (error) {
      CatchError(error, next)
    }
  }
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = await Category.createCategory({ category: req.body })
      res.status(201).json({ message: "category created.", payload: { category }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = await Category.updateCategory({
        categoryId: req.params.categoryId,
        data: req.body,
      })
      res.status(200).json({ message: "category updated.", payload: { category }, status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
  async updateCategoryStatus(req: Request, res: Response, next: NextFunction) {
    try {
      await Category.updateCategoryStatus({
        categoryId: req.params.categoryId,
        status: req.body.status,
      })
      res.status(200).json({ message: "category updated.", status: "success" })
    } catch (error) {
      CatchError(error, next)
    }
  }
}
