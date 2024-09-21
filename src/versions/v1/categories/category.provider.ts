//Business logic for all category routes
import { Category, Feature } from "../../../db"
import { GenerateError } from "../../../services/services"
import MainProvider from "../index.provider"

export default class CategoryProvider extends MainProvider {
  constructor() {
    super("category")
  }
  async getCategory({ categoryId }) {
    try {
      const category = await Category.findByPk(categoryId, { attributes: { include: [this.concatImg("icon")] } })
      if (!category) {
        GenerateError({ message: this._i18n("categoryNotFound"), code: 404 })
      }
      return {
        category,
      }
    } catch (error) {
      throw error
    }
  }
  async getCategories() {
    const { count, rows } = await Category.findAndCountAll({
      where: { status: "ACTIVE" },
      attributes: ["id", "nameAr", "nameEn",],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = { message: "Fetched successfully", payload: { categories: rows, }, status: "success", }
    } else {
      result = { message: this._i18n("thereNoCategories"), payload: { categories: [] }, status: "success", }
    }
    return { result }
  }
  async getCategoriesWithFilters() {
    const { count, rows } = await Category.findAndCountAll({
      where: { status: "ACTIVE" },
      attributes: ["id", "nameAr", "nameEn"],
      include: [
        {
          model: Feature,
          attributes: ["id", "nameAr", "nameEn"],
          through: { attributes: [] },
        },
      ],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { categories: rows },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNoCategories"),
        payload: { categories: [] },
        status: "success",
      }
    }
    return { result }
  }

  async getDashboardCategories({ page, perPage }) {
    const { count, rows } = await Category.findAndCountAll({
      where: { status: "ACTIVE" },
      offset: page * perPage,
      limit: perPage,
      order: [["createdAt", "DESC"]],
    })
    let result: { message: string; payload: object; status: string }
    if (count > 0) {
      result = {
        message: "Fetched successfully",
        payload: { categories: rows, totalItems: count },
        status: "success",
      }
    } else {
      result = {
        message: this._i18n("thereNoCategories"),
        payload: { categories: [] },
        status: "success",
      }
    }
    return { result }
  }

  async createCategory({ category }) {
    const result = await Category.create({
      nameAr: category.nameAr,
      nameEn: category.nameEn,
      countryId: category.countryId,
    })
    return { category: result }
  }

  async updateCategory({ categoryId, data }) {
    const category = await Category.findByPk(categoryId)
    if (!category) {
      GenerateError({ message: this._i18n("categoryNotFound"), code: 404 })
    }
    category.nameAr = data.nameAr
    category.nameEn = data.nameEn
    const result = await category.save();
    return { category: result }
  }

  async updateCategoryStatus({ categoryId, status }) {
    try {
      const category = await Category.findByPk(categoryId)
      if (!category) {
        GenerateError({ message: this._i18n("categoryNotFound"), code: 404 })
      }
      let result: object = category
      if (category.status !== status) {
        category.status = status
        result = await category.save()
      }
      return { category: result }
    } catch (error) {
      throw error
    }
  }
}
