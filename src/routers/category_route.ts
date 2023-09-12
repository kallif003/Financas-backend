import express from "express";
import CategoryController from "../controllers/category_controller";
import { Permissions, Routes } from "../utils/enum";
import { verifyPermission } from "../middleware";

const category_route = express.Router();
const category_controller = new CategoryController();

category_route
  .post(
    Routes.GET_CATEGORY_NAME,
    verifyPermission([Permissions.USER]),
    category_controller.getNameOfAllCategories
  )
  .post(
    Routes.GET_CATEGORY_BY_ID,
    verifyPermission([Permissions.USER]),
    category_controller.getCategoryById
  )
  .post(
    Routes.GET_CATEGORIES,
    verifyPermission([Permissions.USER]),
    category_controller.getCategories
  )
  .post(
    Routes.SAVE_CATEGORY,
    verifyPermission([Permissions.USER]),
    category_controller.createCategory
  )
  .put(
    Routes.UPDATE_CATEGORY,
    verifyPermission([Permissions.USER]),
    category_controller.updateCategory
  )
  .delete(
    Routes.DELETE_CATEGORY,
    verifyPermission([Permissions.USER]),
    category_controller.deleteCategory
  );

export default category_route;
