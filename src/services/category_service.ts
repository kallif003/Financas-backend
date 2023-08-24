import HandleError from "../utils/errors/handleError";
import Category from "../models/category";
import { IUpdateCategory } from "../utils/interfaces";
import PaginationService from "./pagination_service";

class CategoryService extends PaginationService {
  static async createCategoryService(
    name: string,
    value: number,
    userId: string
  ) {
    try {
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      const existingCategory = await Category.findOne({
        name,
        deleted: false,
      });

      if (existingCategory != null) {
        throw new HandleError("Essa categoria já existente", 409);
      }

      const category = new Category({ name, value, userId });

      const savedCategory = await category.save();

      return savedCategory;
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getCategoriesService(
    userId: string,
    skip: number,
    itemsPerPage: number
  ) {
    try {
      const query = { userId, deleted: false };

      return await this.getPaginatedItems(query, skip, itemsPerPage, Category);
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async getNameOfAllCategoriesService(userId: string) {
    try {
      const categories = await Category.find(
        { userId, deleted: false },
        "_id name value"
      ).exec();

      const formattedCategories = categories.map((category) => ({
        id: category._id.toString(),
        name: category.name,
        destinedValue: category.value,
      }));

      return formattedCategories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCategoryByIdService(id: string) {
    try {
      const category = await Category.findById(id);

      return category;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateCattegoryService(
    updateData: IUpdateCategory[],
    id: string
  ) {
    try {
      const existingCategory = await Category.find({
        userId: updateData[0].userId,
        name: updateData[0].name,
        deleted: false,
      });

      if (existingCategory.length > 0) {
        throw new HandleError("Essa categoria já existe", 409);
      }

      let category = (await Category.findById(id)) as any;

      for (const key in updateData[0]) {
        const value = updateData[0][key as keyof IUpdateCategory];

        if (value) category[key] = value;
      }

      const updateCategory = await category!.save();

      return updateCategory;
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }

  static async deleteCategoryService(id: string) {
    try {
      const currentDate = new Date();

      const category = await Category.findByIdAndUpdate(
        id,
        {
          deleted: true,
          deletedAt: currentDate,
        },
        { new: true }
      );

      return category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default CategoryService;
