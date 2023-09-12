import HandleError from "../utils/errors/handleError";

abstract class PaginationService {
  static async getPaginatedItems(
    query: object,
    skip: number,
    itemsPerPage: number,
    model: any
  ) {
    try {
      const items = await model.find(query).skip(skip).limit(itemsPerPage);

      if (items.length === 0) {
        throw new HandleError("Não há registros para essa busca", 404);
      }

      const totalItems = await model.find(query).count();

      const totalPages = Math.ceil(totalItems / itemsPerPage);

      return { items, totalPages };
    } catch (error) {
      if (error instanceof HandleError) {
        throw error;
      }

      throw new Error(error.message);
    }
  }
}

export default PaginationService;
