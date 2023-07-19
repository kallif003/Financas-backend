import express from "express";
import { Permissions, Routes } from "../utils/enum";
import UserController from "../controllers/user_controllers";
import { verifyPermission, verifyToken } from "../middleware";
import { userCreateSchema } from "../middleware/schemas/userSchema";

const user_route = express.Router();
const user_controller = new UserController();

user_route
  .post(Routes.SAVE_USER, userCreateSchema, user_controller.createUser)
  .put(Routes.REDEFINE_PASSWORD, user_controller.redefinePassword)
  .put(
    Routes.UPDATE_USER,
    verifyToken,
    verifyPermission([Permissions.USER]),
    user_controller.updateUsers
  )
  .put(
    Routes.NEW_PASSWORD,
    verifyToken,
    verifyPermission([Permissions.USER]),
    user_controller.redefinePassword
  )
  .delete(
    Routes.DELETE_USER,
    verifyToken,
    verifyPermission([Permissions.USER]),
    user_controller.deleteUsers
  );

export default user_route;
