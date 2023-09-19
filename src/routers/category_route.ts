import express from "express";
import CategoryController from "../controllers/category_controller";
import { Routes } from "../utils/enum";

const category_route = express.Router();
const category_controller = new CategoryController();

category_route
  .post(Routes.GET_CATEGORY_NAME, category_controller.getNameOfAllCategories)
  .post(Routes.GET_CATEGORY_BY_ID, category_controller.getCategoryById)
  .post(Routes.GET_CATEGORIES, category_controller.getCategories)
  .post(Routes.SAVE_CATEGORY, category_controller.createCategory)
  .put(Routes.UPDATE_CATEGORY, category_controller.updateCategory)
  .delete(Routes.DELETE_CATEGORY, category_controller.deleteCategory);

export default category_route;
