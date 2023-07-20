import HandleError from "../utils/errors/handleError";
import Category from "../models/category";

class CategoryService {
  static async createCategoryService(
    name: string,
    value: number,
    userId: string
  ) {
    try {
      const existingCategory = await Category.findOne({
        name,
        deleted: false,
      });

      if (existingCategory != null) {
        throw new HandleError("Essa categoria já existente", 409);
      }

      const category = new Category({ name, value, userId });

      
    } catch (error: any) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }
}
