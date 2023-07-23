import HandleError from "../utils/errors/handleError";
import Category from "../models/category";

class CategoryService {
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

      const categories = await Category.find(query)
        .skip(skip)
        .limit(itemsPerPage);

      if (categories.length == 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalCategories = await Category.find(query).count();

      const totalPages = Math.ceil(totalCategories / itemsPerPage);

      return { categories, totalPages };
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
        "_id name"
      ).exec();

      const formattedCategories = categories.map((category) => ({
        id: category._id.toString(),
        name: category.name,
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
}

export default CategoryService;
