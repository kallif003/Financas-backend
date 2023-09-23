import { Request, Response } from "express";
import CategoryService from "../services/category_service";
import HandleError from "../utils/errors/handleError";

class CategoryController {
  async createCategory(req: Request, res: Response) {
    try {
      const { name, value } = req.body;
      const { id } = req.params;

      const category = await CategoryService.createCategoryService(
        name,
        value,
        id
      );

      return res.status(201).json(category);
    } catch (error: any) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const { page, itemsPerPage } = req.body;
      const { id } = req.params;

      const skip = (parseInt(page) - 1) * parseInt(itemsPerPage);

      const categories = await CategoryService.getCategoriesService(
        id,
        skip,
        itemsPerPage
      );

      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }
  async getNameOfAllCategories(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categories = await CategoryService.getNameOfAllCategoriesService(
        id
      );

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await CategoryService.getCategoryByIdService(id);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      let { userId, name, value } = req.body;

      const { id } = req.params;

      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }

      const category = await CategoryService.updateCattegoryService(
        [{ userId, name, value }],
        id
      );

      return res.status(204).json("updated category");
    } catch (error) {
      if (error instanceof HandleError) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      return res.status(500).send({ message: error.message });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await CategoryService.deleteCategoryService(id);

      return res.status(204).json("deleted category");
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}

export default CategoryController;
